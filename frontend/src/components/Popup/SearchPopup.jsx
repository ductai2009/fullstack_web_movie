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

import ReactPlayer from 'react-player';
import images from '@/assets/image';
import { useEffect } from 'react';

function SearchPopup({ isOpen, setOpen, children }) {
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent className="w-full h-full max-w-full bg-black overflow-hidden border-none outline-none">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70"
                    style={{
                        backgroundImage: `url(${images.bgAuth})`,
                    }}
                ></div>
                <div className="z-10 flex flex-col items-center justify-start">{children}</div>
            </DialogContent>
        </Dialog>
    );
}
export default SearchPopup;
