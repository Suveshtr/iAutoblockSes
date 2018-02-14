exports.port = process.env.PORT || 5001
exports.origin = process.env.ORIGIN || `http://localhost:${exports.port}`
express.fromemail = process.env.FROMEMAIL || 'FROM_EMAIL'
express.toemail = process.env.TOEMAIL || 'TO_EMAIL'
express.allowedOrigin = process.env.ALLOWEDORIGIN || 'YOUR_DOMAIN'
