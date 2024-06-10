import React from 'react';

function Comment({user, title, time}){
    return (
        <div className={'rounded-md bg-white p-1 px-4 text-[14px] mb-2  shadow-md'}>
            <p className={'text-orange-600'}>{user}</p>
            <p className={'my-1'}>{title}</p>
            <p className={'text-end text-gray-400 text-[12px] -mt-1'}>{time}</p>
        </div>
    )
}

function CommentList(props) {
    const arr = [
        {
            user:'Nguyễn Đình Tuấn Đạt',
            title:'Anh đức nay đẹp trai dữ!',
            time:'19:00 01/01/1999'
        },{
            user:'Bùi Đăng Đức',
            title:'Đúng còn nói rõ to!',
            time:'19:20 01/01/1999'
        },
        {
            user:'Nguyễn Đình Tuấn Đạt',
            title:'Anh đức nay đẹp trai dữ!',
            time:'19:00 01/01/1999'
        },{
            user:'Bùi Đăng Đức',
            title:'Đúng còn nói rõ to!',
            time:'19:20 01/01/1999'
        },
        {
            user:'Nguyễn Đình Tuấn Đạt',
            title:'Anh đức nay đẹp trai dữ!',
            time:'19:00 01/01/1999'
        },{
            user:'Bùi Đăng Đức',
            title:'Đúng còn nói rõ to!',
            time:'19:20 01/01/1999'
        }
    ]
    return (
        <div className={'overflow-y-scroll h-[100%]'}>
            {
                arr.map((e,i)=>(
                    <Comment key={i} user={e.user} title={e.title} time={e.time}/>
                ))
            }
        </div>
    );
}

export default CommentList;