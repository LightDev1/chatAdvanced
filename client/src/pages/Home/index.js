import React from 'react';
import { Input } from 'antd';
import { TeamOutlined, FormOutlined, EllipsisOutlined } from '@ant-design/icons';

import { Dialogs, Message } from 'components'

import './Home.scss';

const Home = () => {
    return (
        <section className="home">
            <div className="chat">
                <div className="chat__sidebar">
                    <div className="chat__sidebar-header">
                        <div>
                            <TeamOutlined />
                            <span>Список диалогов</span>
                        </div>
                        <FormOutlined />
                    </div>
                    <div className="chat__sidebar-search">
                        <Input.Search
                            placeholder="Поиск среди контактов"
                        />
                    </div>
                    <div className="chat__sidebar-dialogs">
                        <Dialogs
                            userId={0}
                            items={[
                                {
                                    "_id": "21f09bfd77a0474298648a7b5599f4d3",
                                    "text": "Duis do eu culpa ad mollit sit minim quis sunt esse anim. Ex velit sint consequat ipsum fugiat irure consequat ut. Do tempor voluptate magna ipsum id pariatur.",
                                    "createdAt": new Date(),
                                    "user": {
                                        "_id": "21f09bfd77a0474298648a7b5599f4d3",
                                        "fullname": "Perez Jacobson",
                                        "avatar": null
                                    }
                                },
                                {
                                    "_id": "41b4cc8ffc01aef863dfa8afcbbd0986",
                                    "text": "Lorem aute in culpa adipisicing aute aliquip nulla quis irure ea enim ullamco sunt. Consequat deserunt ipsum officia ut officia officia ut tempor tempor qui velit voluptate aliqua. Ad aliquip tempor tempor sint commodo esse deserunt et elit aute Lorem in et.",
                                    "createdAt": new Date(),
                                    "user": {
                                        "_id": "41b4cc8ffc01aef863dfa8afcbbd0986",
                                        "fullname": "Fitzgerald Eaton",
                                        "avatar": null
                                    }
                                },
                                {
                                    "_id": "e079c8cddf392c639c7e77481717352a",
                                    "text": "Irure proident consequat ipsum dolore do Lorem mollit ad sit id. Consequat non exercitation sunt nostrud laborum consequat quis ea. Eiusmod occaecat excepteur do occaecat elit id aliqua dolore deserunt ea.",
                                    "createdAt": new Date(),
                                    "user": {
                                        "_id": "e079c8cddf392c639c7e77481717352a",
                                        "fullname": "Stanton Alford",
                                        "avatar": null
                                    }
                                },
                                {
                                    "_id": "6e68d13b2678d793d340b5fb0c79297d",
                                    "text": "Ut elit enim enim cupidatat ut velit eiusmod. Duis sint labore non velit elit qui do sunt in non nisi. Consectetur deserunt irure magna mollit aute.",
                                    "createdAt": new Date(),
                                    "user": {
                                        "_id": "6e68d13b2678d793d340b5fb0c79297d",
                                        "fullname": "Preston Cohen",
                                        "avatar": null
                                    }
                                },
                                {
                                    "_id": "f31af49941293524c86c746c10e72f0d",
                                    "text": "Eiusmod commodo velit proident sint enim. Commodo cupidatat laboris anim nisi id dolor fugiat sint adipisicing. Anim exercitation enim consequat duis.",
                                    "createdAt": new Date(),
                                    "user": {
                                        "_id": "f31af49941293524c86c746c10e72f0d",
                                        "fullname": "Lenore Vinson",
                                        "avatar": null
                                    }
                                },
                                {
                                    "_id": "2f0405c6a12d20a5acbd91db41c016b8",
                                    "text": "Minim ad consectetur consectetur laborum do consequat Lorem nisi mollit ex aute anim consectetur voluptate. Nostrud Lorem velit duis ut esse cillum exercitation occaecat. Adipisicing labore aliqua in ut fugiat labore magna.",
                                    "createdAt": new Date(),
                                    "user": {
                                        "_id": "2f0405c6a12d20a5acbd91db41c016b8",
                                        "fullname": "Audrey Lopez",
                                        "avatar": null
                                    }
                                },
                                {
                                    "_id": "24c931d4acbec73f8d5f0265c8f1d413",
                                    "text": "Mollit officia amet commodo labore laborum exercitation irure. Excepteur reprehenderit occaecat ipsum nisi consequat duis consectetur mollit occaecat qui officia. Et consequat eiusmod duis eu eiusmod veniam cupidatat mollit laboris est.",
                                    "createdAt": new Date(),
                                    "user": {
                                        "_id": "24c931d4acbec73f8d5f0265c8f1d413",
                                        "fullname": "Mona Benton",
                                        "avatar": null
                                    }
                                },
                                {
                                    "_id": "cb20a36a653a59a3854c00d6c61ab3c8",
                                    "text": "Quis cillum cillum pariatur Lorem excepteur proident consectetur sit elit est quis eu in. Sint qui labore quis quis cupidatat dolore laborum commodo dolore nisi dolor commodo et incididunt. Proident reprehenderit Lorem occaecat nisi laborum tempor est incididunt.",
                                    "createdAt": new Date(),
                                    "user": {
                                        "_id": "cb20a36a653a59a3854c00d6c61ab3c8",
                                        "fullname": "Bethany Oconnor",
                                        "avatar": null
                                    }
                                },
                                {
                                    "_id": "140ed62cb052f591a5f2999288357281",
                                    "text": "Ad proident amet minim officia consectetur aliqua minim exercitation. Quis dolor pariatur eu excepteur. Sit adipisicing laboris sit nostrud in velit enim occaecat ipsum.",
                                    "createdAt": new Date(),
                                    "user": {
                                        "_id": "140ed62cb052f591a5f2999288357281",
                                        "fullname": "Tisha Duke",
                                        "avatar": null
                                    }
                                },
                                {
                                    "_id": "fa568cb4abc8dbb53f03432442481e22",
                                    "text": "Ipsum nulla et in cillum ea commodo cupidatat proident. Id ipsum consequat minim ullamco reprehenderit quis aliqua duis quis. Anim eu aliquip laboris velit aliquip ea.",
                                    "createdAt": new Date(),
                                    "user": {
                                        "_id": "fa568cb4abc8dbb53f03432442481e22",
                                        "fullname": "Irma Lester",
                                        "avatar": null
                                    }
                                }
                            ]}
                        />
                    </div>
                </div>
                <div className="chat__current-dialog">
                    <div className="chat__dialog-header">
                        <div />
                        <div className="chat__dialog-header-center">
                            <b className="сhat__dialog-header-username">Адам Рейкер</b>
                            <div className="chat__dialog-header-status">
                                <span className="status status--online">онлайн</span>
                            </div>
                        </div>
                        <EllipsisOutlined style={{ fontSize: '22px' }} />
                    </div>
                    <div className="chat__dialog-messages">
                        <Message
                            avatar="https://sun2.tele2-nn.userapi.com/s/v1/ig2/r-5V03FpavoTkMH-dy8fpamLnLq3b4kzeZqmjnzWv0b0P1CYKufGQhjeVMFyJEkHq2uR0NAP400Npb4OrIwdwwPN.jpg?size=50x0&quality=96&crop=101,31,406,406&ava=1"
                            date={new Date()}
                            audio="https://notificationsounds.com/storage/sounds/file-sounds-1151-swiftly.mp3"
                        />
                        <Message
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
                            attachments={[
                                {
                                    filename: 'image.jpg',
                                    url: 'https://source.unsplash.com/100x100/?random1&nature,water'
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
