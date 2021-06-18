import React from 'react';

import { Dialogs, Message } from 'components'

import './Home.scss';

const Home = () => {
    return (
        <section className="home">
            <Dialogs
                userId={0}
                items={[
                    {
                        id: Math.random(),
                        text: 'Вчера Е3 смотрел, ну норм игры, сталкер выйдет, прикольно',
                        isReaded: false,
                        createdAt: new Date(2014, 6, 2),
                        user: {
                            _id: 1,
                            fullname: 'Евгений Поносенко',
                            avatar: 'https://sun2.tele2-nn.userapi.com/s/v1/if1/pRhD7sGwZ5QIyygNGKi47eI5_BtAFeHPbrNVrPYKQFjnD24CaT3bCB_GghhEuZObJz6H_xmh.jpg?size=50x0&quality=96&crop=19,1,889,889&ava=1'
                        },
                    },
                    {
                        id: '7e7731c54046a2e47a54854cbb9643e3',
                        text: 'Вчера Е3 смотрел, ну норм игры, сталкер выйдет, прикольно',
                        isReaded: true,
                        createdAt: new Date(),
                        user: {
                            _id: '7e7731c54046a2e47a54854cbb9643e3',
                            fullname: 'Дмитрий Корпенко',
                            avatar: null,
                        },
                    },
                ]}
            />
            <Message
                avatar="https://sun2.tele2-nn.userapi.com/s/v1/ig2/r-5V03FpavoTkMH-dy8fpamLnLq3b4kzeZqmjnzWv0b0P1CYKufGQhjeVMFyJEkHq2uR0NAP400Npb4OrIwdwwPN.jpg?size=50x0&quality=96&crop=101,31,406,406&ava=1"
                date={new Date()}
                audio="https://notificationsounds.com/storage/sounds/file-sounds-1151-swiftly.mp3"
            />
            {/* <Message
                avatar="https://sun2.tele2-nn.userapi.com/s/v1/ig2/r-5V03FpavoTkMH-dy8fpamLnLq3b4kzeZqmjnzWv0b0P1CYKufGQhjeVMFyJEkHq2uR0NAP400Npb4OrIwdwwPN.jpg?size=50x0&quality=96&crop=101,31,406,406&ava=1"
                text="Мы тут недавно войска Ариовиста разбили, чуваки хотели закрепиться на галльских землях, лол 🌝"
                date={new Date()}
                attachments={[
                    {
                        filename: 'image.jpg',
                        url: 'https://source.unsplash.com/100x100/?random1&nature,water'
                    },
                    {
                        filename: 'image.jpg',
                        url: 'https://source.unsplash.com/100x100/?random2&nature,water'
                    },
                    {
                        filename: 'image.jpg',
                        url: 'https://source.unsplash.com/100x100/?random3&nature,water'
                    }
                ]}
            />
            <Message
                avatar="https://sun2.tele2-nn.userapi.com/s/v1/if1/pRhD7sGwZ5QIyygNGKi47eI5_BtAFeHPbrNVrPYKQFjnD24CaT3bCB_GghhEuZObJz6H_xmh.jpg?size=50x0&quality=96&crop=19,1,889,889&ava=1"
                text="Привет как дела?"
                date={new Date()}
                isMe={true}
                isReaded={false}
            />
            <Message
                avatar="https://sun2.tele2-nn.userapi.com/s/v1/ig2/r-5V03FpavoTkMH-dy8fpamLnLq3b4kzeZqmjnzWv0b0P1CYKufGQhjeVMFyJEkHq2uR0NAP400Npb4OrIwdwwPN.jpg?size=50x0&quality=96&crop=101,31,406,406&ava=1"
                isTyping={true}
            />
            <Message
                avatar="https://sun2.tele2-nn.userapi.com/s/v1/ig2/r-5V03FpavoTkMH-dy8fpamLnLq3b4kzeZqmjnzWv0b0P1CYKufGQhjeVMFyJEkHq2uR0NAP400Npb4OrIwdwwPN.jpg?size=50x0&quality=96&crop=101,31,406,406&ava=1"
                attachments={[
                    {
                        filename: 'image.jpg',
                        url: 'https://source.unsplash.com/100x100/?random1&nature,water'
                    }
                ]}
            /> */}
        </section>
    );
};

export default Home;
