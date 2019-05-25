(async () => {
  const os = require('os')
  const fs = require('fs')
  const IP_DIR = './services/';
  const IP_PATH = IP_DIR + 'ipAddress.json';

  const net = os.networkInterfaces() 
  const ip = {"ip": net.wlp3s0[0].address}
  await fs.writeFileSync(IP_PATH, JSON.stringify(ip));
  console.log("Your credentials have been written to", IP_PATH);
})()
