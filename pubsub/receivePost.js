const amqplib = require("amqplib");
const amqp_url_cloud =
  "amqps://nicugdke:Cfhhbzhf9qmBLedC_bC3RVcOnEEk0yXy@armadillo.rmq.cloudamqp.com/nicugdke";

const receivePost = async () => {
  try {
    //tạo connect
    const connection = await amqplib.connect(amqp_url_cloud);

    //tạo channel
    const channel = await connection.createChannel();

    //tao name
    const nameExchange = "video";

    await channel.assertExchange(nameExchange, "fanout", {
      durable: false,
    });

    const { queue } = await channel.assertQueue("", {
      exclusive: true, // khi hủy sub thì queue tự động được xóa đi 
    });

    console.log("queue::::::::::", queue);

    await channel.bindQueue(queue, nameExchange, "");

    await channel.consume(
      queue,
      (msg) => {
        console.log(`msg::::`, msg.content.toString());
      },
      {
        noAck: true,
      }
    );

    console.log("queueName::::::::", queue);
  } catch (error) {
    console.log("::::::::::", error);
  }
};

receivePost();
