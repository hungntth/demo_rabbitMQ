const amqplib = require("amqplib");
const amqp_url_cloud =
  "amqps://nicugdke:Cfhhbzhf9qmBLedC_bC3RVcOnEEk0yXy@armadillo.rmq.cloudamqp.com/nicugdke";

const receiveEmail = async () => {
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

    // create queue
    const { queue } = await channel.assertQueue("", {
      exclusive: true,
    });

    // bingding
    const agrs = process.argv.slice(2);

    if (!agrs.length) {
      process.exit(0);
    }
    // * phù hợp với tất cả các từ bất kỳ
    // # khớp với 1 hoặc nhiều từ bất kỳ
    console.log(`queue::::${queue}::::::topic::::::${agrs}`);

    agrs.forEach(async (key) => {
      await channel.bindQueue(queue, nameExchange, key);
    });

    // publish email

    await channel.consume(queue, (msg) => {
      console.log("::::::Routing key: ", msg.fields.routingKey);
      console.log("::::::msg    : ", msg.content.toString());
    });
  } catch (error) {
    console.log("::::::::::", error);
  }
};

receiveEmail();
