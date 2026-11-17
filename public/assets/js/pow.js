// Prueba de trabajo para la Edge Function «solicitar-incorporacion».
// Busca un nonce (número en texto) tal que SHA-256("<id>.<exp>.<dif>.<nonce>") empiece por al menos <dif> bits a cero,
// igual que lo comprueba el servidor. Funciona como Web Worker (fuera del hilo principal) o como script normal (self.taraPow).
(function (root) {
  'use strict';
  var K = new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2]);
  var W = new Uint32Array(64);
  var H = new Uint32Array(8);

  // SHA-256 de un texto ASCII (el mensaje solo lleva hexadecimal, dígitos y puntos). Devuelve los 8 words del resumen en H.
  function sha256(str) {
    var len = str.length;
    var blocks = ((len + 9 + 63) >> 6);
    var bytes = new Uint8Array(blocks * 64);
    for (var i = 0; i < len; i++) bytes[i] = str.charCodeAt(i);
    bytes[len] = 0x80;
    var bits = len * 8, end = blocks * 64;
    bytes[end - 4] = (bits >>> 24) & 0xff; bytes[end - 3] = (bits >>> 16) & 0xff; bytes[end - 2] = (bits >>> 8) & 0xff; bytes[end - 1] = bits & 0xff;
    H[0] = 0x6a09e667; H[1] = 0xbb67ae85; H[2] = 0x3c6ef372; H[3] = 0xa54ff53a; H[4] = 0x510e527f; H[5] = 0x9b05688c; H[6] = 0x1f83d9ab; H[7] = 0x5be0cd19;
    for (var b = 0; b < blocks; b++) {
      var o = b * 64, t;
      for (t = 0; t < 16; t++) W[t] = (bytes[o + t * 4] << 24) | (bytes[o + t * 4 + 1] << 16) | (bytes[o + t * 4 + 2] << 8) | bytes[o + t * 4 + 3];
      for (t = 16; t < 64; t++) {
        var w15 = W[t - 15], w2 = W[t - 2];
        var s0 = ((w15 >>> 7) | (w15 << 25)) ^ ((w15 >>> 18) | (w15 << 14)) ^ (w15 >>> 3);
        var s1 = ((w2 >>> 17) | (w2 << 15)) ^ ((w2 >>> 19) | (w2 << 13)) ^ (w2 >>> 10);
        W[t] = (W[t - 16] + s0 + W[t - 7] + s1) | 0;
      }
      var a = H[0], c1 = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
      for (t = 0; t < 64; t++) {
        var S1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
        var ch = (e & f) ^ (~e & g);
        var t1 = (h + S1 + ch + K[t] + W[t]) | 0;
        var S0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
        var mj = (a & c1) ^ (a & c) ^ (c1 & c);
        var t2 = (S0 + mj) | 0;
        h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = c1; c1 = a; a = (t1 + t2) | 0;
      }
      H[0] = (H[0] + a) | 0; H[1] = (H[1] + c1) | 0; H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0;
      H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
    }
    return H;
  }

  function zeroBits(h) {
    var n = 0;
    for (var i = 0; i < 8; i++) {
      if (h[i] === 0) { n += 32; continue; }
      return n + Math.clz32(h[i]);
    }
    return n;
  }

  // Busca en [desde, desde+cuantos). Devuelve el nonce en texto o null.
  function search(prefix, dif, desde, cuantos) {
    for (var n = desde, fin = desde + cuantos; n < fin; n++) {
      if (zeroBits(sha256(prefix + n)) >= dif) return String(n);
    }
    return null;
  }

  function hex(h) {
    var s = '';
    for (var i = 0; i < 8; i++) s += ('00000000' + (h[i] >>> 0).toString(16)).slice(-8);
    return s;
  }

  var api = { search: search, sha256hex: function (s) { return hex(sha256(s)); } };

  if (typeof WorkerGlobalScope !== 'undefined' && root instanceof WorkerGlobalScope) {
    root.onmessage = function (e) {
      var p = e.data, n = 0, CHUNK = 50000, MAX = 1e12;
      while (n < MAX) {
        var r = search(p.prefix, p.dif, n, CHUNK);
        if (r !== null) { root.postMessage({ nonce: r }); return; }
        n += CHUNK;
      }
      root.postMessage({ nonce: null });
    };
  } else {
    root.taraPow = api;
  }
})(self);
