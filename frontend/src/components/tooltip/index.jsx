import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

function TooltipShadcn({ title, content, classTitle, classContent }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className={classTitle}>{title}</TooltipTrigger>
                <TooltipContent>
                    <div className={classContent}>{content}</div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default TooltipShadcn;
