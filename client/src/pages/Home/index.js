import React from 'react';

import { Message } from 'components'

import './Home.scss';

const Home = () => {
    return (
        <section className="home">
            <Message
                avatar="https://sun2.tele2-nn.userapi.com/s/v1/ig2/r-5V03FpavoTkMH-dy8fpamLnLq3b4kzeZqmjnzWv0b0P1CYKufGQhjeVMFyJEkHq2uR0NAP400Npb4OrIwdwwPN.jpg?size=50x0&quality=96&crop=101,31,406,406&ava=1"
                text="Мы тут недавно войска Ариовиста разбили, чуваки хотели закрепиться на галльских землях, лол 🌝"
                date={new Date()}
            />
            <Message
                avatar="https://sun2.tele2-nn.userapi.com/s/v1/if1/pRhD7sGwZ5QIyygNGKi47eI5_BtAFeHPbrNVrPYKQFjnD24CaT3bCB_GghhEuZObJz6H_xmh.jpg?size=50x0&quality=96&crop=19,1,889,889&ava=1"
                text="Привет как дела?"
                date={new Date()}
                isMe={true}
            />
        </section>
    );
};

export default Home;
