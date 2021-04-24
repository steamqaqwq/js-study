async function hd(message) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(message);
      }, 2000);
    });
  }
  async function run() {
    let h1 = await hd("1");
    console.log(h1);
    let h2 = await hd("2");
    console.log(h2);
  }
  run();