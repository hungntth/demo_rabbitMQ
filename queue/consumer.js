const amqplib = require("amqplib");
const amqp_url_cloud =
  "amqps://nicugdke:Cfhhbzhf9qmBLedC_bC3RVcOnEEk0yXy@armadillo.rmq.cloudamqp.com/nicugdke";

const receiveQueue = async () => {
  try {
    //tạo connect
    const connection = await amqplib.connect(amqp_url_cloud);

    //tạo chanel
    const chanel = await connection.createChannel();

    // tạo tên hàng chờ
    const nameQueue = "q1";

    await chanel.assertQueue(nameQueue, {
      durable: true, //durable ở producer và consumer phải setup giống nhau
    });

    // receive to queue
    await chanel.consume(
      nameQueue,
      (msg) => {
        console.log("MSG::::::::", msg.content.toString());
      },
      {
        noAck: true,
      }
    );
  } catch (error) {
    console.log("::::::::::", error);
  }
};

receiveQueue();
