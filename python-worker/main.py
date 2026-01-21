import pika
import sys
import os
import time

url = os.environ.get('RABBITMQ_URL', 'amqp://guest:guest@rabbitmq')

def main():
    connection = None
    while connection is None:
        try:
            # Use URLParameters to handle user/pass automatically
            params = pika.URLParameters(url)
            connection = pika.BlockingConnection(params)
        except pika.exceptions.AMQPConnectionError:
            print("Waiting for RabbitMQ...")
            time.sleep(5)

    channel = connection.channel()

    # Declare the queue (idempotent: it won't be created if it exists)
    channel.queue_declare(queue='user_created', durable=True)

    def callback(ch, method, properties, body):
        print(f" [x] Received New User Event: {body.decode()}")
        print(" [x] Simulating sending welcome email...")
        time.sleep(1) # Simulate work
        print(" [x] Email sent!")

    channel.basic_consume(queue='user_created', on_message_callback=callback, auto_ack=True)

    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
