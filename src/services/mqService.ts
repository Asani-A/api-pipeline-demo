import * as amqp from 'amqplib';

let connection: any;
let channel: amqp.Channel;

export const connectToRabbitMQ = async () => {
  if (connection) return;

  const amqpServer = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
  
  // Give it ample attempts to connect
  let retries = 10;
  while (retries) {
    try {
      console.log(`Attempting to connect to RabbitMQ... (${retries} retries left)`);
      connection = await amqp.connect(amqpServer);
      channel = await connection.createChannel();
      
      // Fixes the Warning: Make queue 'durable' (saved to disk)
      await channel.assertQueue('user_created', { durable: true });
      
      console.log("✅ Connected to RabbitMQ");
      return;
    } catch (error) {
      console.error("❌ RabbitMQ connection failed");
      retries -= 1;
      console.log("   Retrying in 5 seconds...");
      // Wait 5 seconds before trying again
      await new Promise(res => setTimeout(res, 5000));
    }
  }
  
  console.error("🚨 Could not connect to RabbitMQ after multiple attempts.");
  process.exit(1); // Kill the app if we can't connect
};

export const publishUserCreated = (user: any) => {
  if (!channel) {
    console.error("❌ Cannot publish: RabbitMQ channel not established");
    return;
  }
  
  const message = JSON.stringify(user);
  // RabbitMQ requires a Buffer
  channel.sendToQueue('user_created', Buffer.from(message));
  console.log(`Message sent to queue: ${message}`);
};
