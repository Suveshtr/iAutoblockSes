exports.port = process.env.PORT || 5001
exports.origin = process.env.ORIGIN || `http://localhost:${exports.port}`
exports.fromemail = process.env.FROMEMAIL || 'FROM_EMAIL'
exports.toemail = process.env.TOEMAIL || 'TO_EMAIL'
exports.ccemails = process.env.TOEMAIL || 'CC_EMAILS'
exports.allowedOrigin = process.env.ALLOWEDORIGIN || 'YOUR_DOMAIN'
