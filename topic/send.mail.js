const amqplib = require("amqplib");
const amqp_url_cloud =
  "amqps://nicugdke:Cfhhbzhf9qmBLedC_bC3RVcOnEEk0yXy@armadillo.rmq.cloudamqp.com/nicugdke";

const sendEmail = async () => {
  try {
    //tạo connect
    const connection = await amqplib.connect(amqp_url_cloud);

    //tạo channel
    const channel = await connection.createChannel();

    //tao name
    const nameExchange = "sendMail";

    await channel.assertExchange(nameExchange, "topic", {
      durable: false,
    });

    const agrs = process.argv.slice(2);
    const msg = agrs[1] || "Fixed!";
    const topic = agrs[0];

    console.log(`msg::::${msg}::::::topic::::::${topic}`);

    // publish email

    await channel.publish(nameExchange, topic, Buffer.from(msg));

    console.log("msgSend::::::::", msg);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 2000);
  } catch (error) {
    console.log("::::::::::", error);
  }
};

sendEmail();
