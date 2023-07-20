const amqplib = require("amqplib");
const amqp_url_cloud =
  "amqps://nicugdke:Cfhhbzhf9qmBLedC_bC3RVcOnEEk0yXy@armadillo.rmq.cloudamqp.com/nicugdke";

const sendQueue = async ({ msg }) => {
  try {
    //tạo connect
    const connection = await amqplib.connect(amqp_url_cloud);

    //tạo chanel
    const chanel = await connection.createChannel();

    // tạo tên hàng chờ
    const nameQueue = "q2";

    await chanel.assertQueue(nameQueue, {
      durable: false, // durable là tính bền bỉ ,đổi sang true để khi server restart không bị mất msg
    });

    // send to queue
    await chanel.sendToQueue(nameQueue, Buffer.from(msg), {
      // TTL
      //   expiration: "10000",
      // msg được xử lý liên tục, lưu vào ổ đĩa hoặc cacche, nếu cache có vấn đề thì sử dụng disk
      persistent: true,
    });
  } catch (error) {
    console.log("::::::::::", error);
  }
};

sendQueue({ msg: "message thứ nhất q2" });
