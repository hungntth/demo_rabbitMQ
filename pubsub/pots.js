const amqplib = require("amqplib");
const amqp_url_cloud =
  "amqps://nicugdke:Cfhhbzhf9qmBLedC_bC3RVcOnEEk0yXy@armadillo.rmq.cloudamqp.com/nicugdke";

const postVideo = async ({ msg }) => {
  try {
    //tạo connect
    const connection = await amqplib.connect(amqp_url_cloud);

    //tạo channel
    const channel = await connection.createChannel();
    
    //tao name
    const nameExchange = 'video'

    await channel.assertExchange(nameExchange, 'fanout', {
        durable: false
    })

    await channel.publish(nameExchange, '', Buffer.from(msg))

    console.log('msgSend::::::::', msg)

    setTimeout(() => {
        connection.close()
        process.exit(0);
    }, 2000)
  } catch (error) {
    console.log("::::::::::", error);
  }
};

postVideo({ msg: "video không vui" });
