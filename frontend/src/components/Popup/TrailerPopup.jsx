// import { Button } from '@/components/ui/button';
import Button from '@/components/Button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { z } from 'zod';
import ReactPlayer from 'react-player';
import images from '@/assets/image';
import { useState } from 'react';

function TrailerPopup({ url, nameMovie }) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="text-[1vw] ">
                    Trailer
                </Button>
            </DialogTrigger>
            <DialogContent className="w-auto min-w-[65vw] h-[70vh] bg-black overflow-hidden border-none outline-none !rounded-[20px]">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70"
                    style={{
                        backgroundImage: `url(${images.bgAuth})`,
                    }}
                ></div>
                <div className=" z-10 flex flex-col items-center justify-center h-full gap-6 ">
                    <DialogHeader className="w-full">
                        <DialogTitle className="text-[2.4vw] text-white mx-auto">{nameMovie}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="text-[1.2vw]"></DialogDescription>
                    <div className="w-full h-full">
                        <ReactPlayer
                            url={url}
                            // url="https://www.youtube.com/watch?v=U_57yQqAV3U"
                            playing={false}
                            muted={false}
                            controls={true}
                            width="100%"
                            height="100%"
                            // onEnded={handlePlayPause}
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
export default TrailerPopup;
