import { useEffect, useRef, useState } from 'react';
import { LikeIcon } from '@/components/Icon';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { forwardRef, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentAsync, addReplyCommentAsync } from '@/redux/actions';

import useFormattedTime from '@/hooks/useFormattedTime';
import Image from '@/components/Image';

const Comment = ({ comment, user, slug, clsImg = '', idCmtBase }) => {
    const [showReply, setShowReply] = useState(false);
    const [isLogin, setIsLogin] = useState(user.isLogin);
    const replyFormRef = useRef(null);

    const handleCancelReply = () => {
        setShowReply(false);
    };

    var img_src = '/src/assets/avatars' + comment.image;
    var clsImg_ = 'w-12 h-12 rounded-full';
    var isReply = true;

    if (!clsImg) {
        clsImg = 'w-16 h-16 rounded-full';
        isReply = false;
    }

    return (
        <div className="flex gap-3 mt-4">
            <Image src={img_src} alt={comment.username} className={clsImg} />
            <div className="flex-1">
                <div className="hover:bg-zinc-900 p-3 rounded-xl">
                    <div className="font-semibold text-white text-[0.8vw] flex flex-row gap-2 items-center">
                        {comment.reply_by ? (
                            <div className="flex flex-row gap-2 items-center">
                                {comment.username}
                                <div className="flex items-center gap-1 text-blue-700 hover:cursor-pointer  mb-1">
                                    <div className="text-stone-500 mb-[-3px] text-[0.7vw] font-[100] italic">
                                        Phản hồi:
                                    </div>
                                    <div className="underline">@{comment.reply_by}</div>
                                </div>
                            </div>
                        ) : (
                            comment.username
                        )}
                        <span className="text-gray-400 ml-2 text-[0.7vw]">{useFormattedTime(comment.createdAt)}</span>
                    </div>
                    {comment.reply_cmt ? (
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3 text-gray-300 w-fit mt-1 text-[0.8vw] bg-slate-700 p-2 rounded-[5px] !leading-8">
                                {/* <div className="text-gray-50 font-[500]  hover:cursor-pointer">{comment.reply_by}:</div> */}
                                <div className="italic">{comment.reply_cmt}</div>
                            </div>
                            <div className="text-gray-300 mt-1 text-[0.9vw] !leading-8 pl-2">{comment.comment}</div>
                        </div>
                    ) : (
                        <div className="text-gray-300 mt-1 text-[0.9vw] !leading-8">{comment.comment}</div>
                    )}

                    <div className="flex items-center gap-4 mt-2 text-gray-400 text-[0.7vw]">
                        <span className="flex items-center gap-1">
                            <button>
                                <LikeIcon />
                            </button>{' '}
                            {comment.like}
                        </span>

                        <button
                            className="hover:underline"
                            onClick={() => {
                                setShowReply(!showReply);
                            }}
                        >
                            Phản hồi
                        </button>
                    </div>
                </div>
                {showReply && isLogin && (
                    <ReplyForm
                        ref={replyFormRef}
                        infoCmt={comment}
                        user={user}
                        idCmtBase={idCmtBase}
                        slug={slug}
                        isReply={isReply}
                        onCancel={handleCancelReply}
                    />
                )}

                {comment.replies?.length > 0 && (
                    <div className="border-l-2 border-gray-600 pl-4">
                        {comment.replies.map((reply) => (
                            <Comment
                                key={reply._id}
                                comment={reply}
                                user={user}
                                slug={slug}
                                clsImg={clsImg_}
                                idCmtBase={idCmtBase}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const ReplyForm = forwardRef(({ user, infoCmt, onCancel, slug, isReply = false, idCmtBase }, ref) => {
    const [reply, setReply] = useState('');
    const dispatch = useDispatch();
    useImperativeHandle(ref, () => ({
        cancelReply: () => {
            onCancel();
        },
    }));
    // var clsReplyForm = 'mt-3 flex gap-4 flex-rol';
    // if (isReply) {
    //     clsReplyForm = 'mt-3 flex gap-4';
    // }

    const handleReply = () => {
        const replyData = {
            id: idCmtBase,
            reply_by: isReply ? infoCmt?.username : '',
            reply_cmt: isReply ? infoCmt?.comment : '',
            email: user.email,
            comment: reply,
            image: user.image,
            username: user.username,
        };

        dispatch(addReplyCommentAsync(replyData, slug));
        onCancel();
        setReply('');
    };

    var img_src = '/src/assets/avatars' + user.image;

    return (
        <div className="mt-3 flex gap-4 flex-row">
            <Image src={img_src} className="w-12 h-12 rounded-full" />
            <Textarea
                type="text"
                placeholder="Phản hồi..."
                onChange={(e) => setReply(e.target.value)}
                value={reply}
                className="resize-none flex-1 !py-4 !pb-0 !text-[0.9vw] !leading-7 bg-transparent text-white border-t-0 border-l-0 border-r-0 !border-b"
            />
            <Button
                className="!text-[0.9vw] bg-transparent p-8 rounded-[6px] mt-4 hover:bg-slate-600"
                onClick={() => {
                    setReply('');
                    onCancel();
                }}
            >
                Hủy
            </Button>
            <Button
                className="!text-[0.9vw] bg-slate-700 p-8 rounded-[6px] mt-4 hover:bg-slate-600"
                onClick={() => handleReply()}
            >
                Phản hồi
            </Button>
        </div>
    );
});

const CommentSection = ({ slug }) => {
    const [isComment, setIsComment] = useState(false);

    const [comment, setComment] = useState('');

    const dispatch = useDispatch();
    const User_store = useSelector((state) => state.auth);
    const [isLogin, setIsLogin] = useState(User_store.isLogin);
    const [userState, setUserState] = useState({
        ...User_store,
    });
    const comments_store = useSelector((state) => state.comment);
    const [commentData, setCommentData] = useState(comments_store?.comment?.commentSchema);
    var img_src = '/src/assets/avatars' + User_store?.user?.image;

    useEffect(() => {
        setUserState({
            ...User_store,
        });
        setIsLogin(User_store.isLogin);
        // console.log('User_store comment', User_store);
    }, [User_store]);
    useEffect(() => {
        setCommentData(comments_store?.comment?.commentSchema);
    }, [comments_store]);
    var clsCmt = '!text-[0.9vw] py-4 !leading-7 resize-none';
    if (isComment) {
        clsCmt = clsCmt + ' px-10 border-t-0 border-l-0 border-r-0 !border-b';
    } else {
        clsCmt = clsCmt + ' !border-none';
    }
    const handleComment = () => {
        const newComment = {
            ...userState,
            comment: comment,
            id_movie: slug,
        };

        dispatch(addCommentAsync(newComment, slug));

        setIsComment(false);
        setComment('');
    };
    return (
        <div className="py-[20px] !m-0 px-[50px] w-dvw mx-auto  bg-black  rounded-xl text-white">
            <h2 className="text-[1.5vw] font-semibold">Bình luận</h2>
            {isLogin && (
                <div className="grid w-full gap-2 mt-10">
                    <div className="flex gap-4">
                        <Image src={img_src} className="w-16 h-16 rounded-full " />
                        <Textarea
                            className={clsCmt}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Viết bình luận."
                            onFocus={() => setIsComment(true)}
                        />
                    </div>
                    {isComment && (
                        <div className="flex justify-end gap-4">
                            <Button
                                className="!text-[0.9vw] bg-transparent p-8 rounded-[6px] mt-4 hover:bg-slate-600"
                                onClick={() => {
                                    setComment('');
                                    setIsComment(false);
                                }}
                            >
                                Hủy
                            </Button>
                            <Button
                                className="!text-[0.9vw] bg-slate-700 p-8 rounded-[6px] mt-4 hover:bg-slate-600"
                                onClick={() => {
                                    handleComment();
                                }}
                            >
                                Bình luận
                            </Button>
                        </div>
                    )}
                </div>
            )}

            <div className="mt-4 flex flex-col gap-6 mb-6">
                {commentData ? (
                    commentData.map((comment) => (
                        <Comment
                            key={comment._id}
                            user={userState}
                            slug={slug}
                            comment={comment}
                            idCmtBase={comment._id}
                        />
                    ))
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default CommentSection;
