const
  IP      = process.env.IP,
  PORT    = process.env.PORT || process.env.PORT_LOCAL || 3000,
  URI     = process.env.DATABASEURL || process.env.DATABASEURL_ONLINE || "mongodb://localhost:27017/test_nodejs_blog",
  indent  = "=".repeat(50),
  // STATUS  = `
  // ${indent}
  // COMPUTERNAME  : ${process.env.COMPUTERNAME}
  // SYSTEM        : ${process.platform} ${process.arch}
  // USERNAME      : ${process.env.USERNAME}
  // DIRNAME       : ${__dirname}
  // NODE.JS       : ${process.version}
  // IP            : ${IP}
  // PORT          : ${PORT}
  // DATABASE      : ${URI}
  // URL           : http://localhost:${PORT}
  // ${indent}`;
  STATUS  = `
  ${indent}
  COMPUTERNAME  : ${process.env.COMPUTERNAME}
  SYSTEM        : ${process.platform} ${process.arch}
  USERNAME      : ${process.env.USERNAME}
  DIRNAME       : ${__dirname}
  NODE.JS       : ${process.version}
  ${indent}`;



module.exports = {PORT, IP, URI, STATUS};