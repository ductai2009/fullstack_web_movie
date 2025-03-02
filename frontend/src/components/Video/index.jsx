import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import '@vidstack/react/player/styles/base.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HeadLessTippy from '@tippyjs/react/headless'; // different import path!
import Tippy from '@tippyjs/react'; // different import path!
import 'tippy.js/dist/tippy.css'; // optional
import config from '@/components/config';
import ClipLoader from 'react-spinners/ClipLoader';
import { DuplicateMediaIcon, PrevIcon, SoundIcon, SoundMuteIcon, WatchingIcon } from '@/components/Icon';
import {
    SeekBackward10Icon,
    SeekForward10Icon,
    MuteIcon,
    VolumeHighIcon,
    VolumeLowIcon,
    PauseIcon,
    PlayIcon,
    FullscreenExitIcon,
    FullscreenIcon,
} from '@vidstack/react/icons';

import {
    MediaPlayer,
    MediaProvider,
    Poster,
    SeekButton,
    MuteButton,
    PlayButton,
    FullscreenButton,
    VolumeSlider,
    Time,
    TimeSlider,
    SpeedSlider,
    Tooltip,
} from '@vidstack/react';

import classNames from 'classnames/bind';
import style from './Video.module.css';
import { getInfoVideo } from '@/services/serviceCallAPI';

import { useEffect, useRef, useState } from 'react';
import Image from '@/components/Image';
import images from '@/assets/image';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import useMediaQuery from '@/hooks/useMediaQuery';

function Video() {
    const cx = classNames.bind(style);
    // Icon should be: `() => ReactNode`
    const None = () => null;
    const refSoTap = useRef(null);
    const urlImg = 'https://img.ophim.live/uploads/movies/';

    const [srcVideo, setSrcVideo] = useState('');
    const [poster, setPoster] = useState('');
    const [nameVideo, setNameVideo] = useState('nameVideo');
    const [slug, setSlug] = useState('');
    const [tapPhim, setTapPhim] = useState(0);

    const [infoVideo, setInfoVideo] = useState({});

    const [isPlaying, setIsPlaying] = useState(false);
    const [isTapPhim, setIsTapPhim] = useState(false);
    const [isLoadingVideo, setIsLoadingVideo] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isMuteVolume, setIsMuteVolume] = useState(false);
    const [source, setSource] = useState([]);
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const handlePlay = (type) => {
        setIsLoadingVideo(!type);

        setIsPlaying(!type);
    };
    useEffect(() => {
        document.title = nameVideo ?? 'Galaxy Play';
    }, [nameVideo]);
    const handleClickVideo = (type) => {
        console.log('click video');
        if (!type) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };
    const showToast = (toastType, content, autoClose = 5000) => {
        const options = {
            position: 'bottom-right',
            autoClose: autoClose,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
        };

        // Hiển thị toast tùy thuộc vào type
        switch (toastType) {
            case 'success':
                toast.success(content, options);
                break;
            case 'error':
                toast.error(content, options);
                break;
            case 'warning':
                toast.warning(content, options);
                break;
            default:
                toast.info(content, options);
                break;
        }
    };

    const handleVolumeVideo = (e) => {
        let value = e.volume;
        let mute = e.muted;

        if (value === 0 || mute) {
            setIsMuteVolume(true);
        } else {
            setIsMuteVolume(false);
        }
    };
    const handleLoadingVideo = (type) => {
        if (type === 'onPlaying') {
            setIsLoadingVideo(false);
            console.log('onPlaying');
            return;
        }
        if (type === 'onWaiting') {
            setIsLoadingVideo(true);
            console.log('onWaiting');
            return;
        }
        if (type === 'onCanPlay') {
            setIsLoadingVideo(false);
            console.log('onCanPlay');
            return;
        }
    };

    const dataVideo = useLocation().state;

    // Base dataVideo
    // state={{
    //     name: item.name,
    //     poster_url: item.poster_url,
    //     slug: item.slug ? item.slug : '',
    //     soTap: 1,
    // }}

    const handleSoTap = () => {
        // console.log('số tập');
        setIsTapPhim(true);
    };

    useEffect(() => {
        if (dataVideo) {
            const slug = dataVideo.slug;
            let soTap = dataVideo.soTap ? dataVideo.soTap - 1 : 0;

            const apiInfoVideo = async (slug) => {
                try {
                    const resultSearch = await getInfoVideo(slug);
                    const sourceResult = resultSearch.dsItem.episodes[0].server_data;
                    setSource(sourceResult);
                    const slug_ = resultSearch.dsItem.slug;
                    setSlug(slug_);
                    if (sourceResult.length - 1 < soTap) {
                        soTap = sourceResult.length - 1;
                    }
                    setTapPhim(soTap);
                    // console.log('data 1: ', sourceResult);
                    console.log('data 2: ', resultSearch);

                    const type = resultSearch.seoOnPage.seoSchema['@type'];
                    // console.log('type ', type);
                    // console.log('source ', resultSearch.dsItem.episodes[0].server_data[soTap]);
                    // console.log('poster_url ', resultSearch.dsItem.poster_url);
                    if (['TvSeries', 'Movie'].includes(type)) {
                        const poster_ = resultSearch.dsItem.poster_url;
                        const source_ = resultSearch.dsItem.episodes[0].server_data[soTap]['link_m3u8'];
                        const name_ = resultSearch.seoOnPage.titleHead;
                        console.log('sotâpp ', soTap);
                        setInfoVideo({
                            soTap: sourceResult[soTap].slug == '' ? sourceResult[soTap].name : sourceResult[soTap].slug,
                            TongSoTap: sourceResult.length,
                        });
                        // console.log('soTap_ ', source_);
                        setPoster(poster_);
                        setSrcVideo(source_);
                        setNameVideo(name_);
                    }
                } catch (error) {
                    console.error('Failed to fetch getDataPhimLe:', error);
                }
            };
            apiInfoVideo(slug);
        } else {
            console.log('No dataVideo');
        }
    }, [dataVideo]);
    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };
    let rows = chunkArray(source, 5);
    const isMobile = useMediaQuery('(max-width: 1024px)');

    if (isMobile) {
        rows = chunkArray(source, 3);
    }
    const handleBack = () => {
        navigate(-1);
    };
    const customIcons = {
        AirPlayButton: {
            Default: None,
            Connecting: None,
            Connected: None,
        },
        GoogleCastButton: {
            Default: None,
            Connecting: None,
            Connected: None,
        },
        PlayButton: {
            Play: PlayIcon,
            Pause: PauseIcon,
            Replay: None,
        },
        MuteButton: {
            Mute: MuteIcon,
            VolumeLow: VolumeLowIcon,
            VolumeHigh: VolumeHighIcon,
        },
        CaptionButton: {
            On: None,
            Off: None,
        },
        // CaptionButton: {
        //     On: None,
        //     Off: NextIcon,
        // },
        PIPButton: {
            Enter: None,
            Exit: None,
        },
        FullscreenButton: {
            Enter: FullscreenIcon,
            Exit: FullscreenExitIcon,
        },
        SeekButton: {
            Backward: SeekBackward10Icon,
            Forward: SeekForward10Icon,
        },
        DownloadButton: {
            Default: None,
        },
        Menu: {
            Accessibility: None,
            ArrowLeft: None,
            ArrowRight: None,
            Audio: None,
            AudioBoostUp: None,
            AudioBoostDown: None,
            Chapters: None,
            Captions: None,
            Playback: None,
            Settings: None,
            SpeedUp: None,
            SpeedDown: None,
            QualityUp: None,
            QualityDown: None,
            FontSizeUp: None,
            FontSizeDown: None,
            OpacityUp: None,
            OpacityDown: None,
            RadioCheck: None,
        },
        KeyboardDisplay: {
            Play: PlayIcon,
            Pause: PauseIcon,
            Mute: MuteIcon,
            VolumeUp: None,
            VolumeDown: None,
            EnterFullscreen: None,
            ExitFullscreen: None,
            EnterPiP: None,
            ExitPiP: None,
            CaptionsOn: None,
            CaptionsOff: None,
            SeekForward: None,
            SeekBackward: None,
        },
    };
    const handlecCompare = (a, b) => {
        if (a === b) {
            return true;
        }
        return false;
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />

            <div className={cx('wrapper__soTap', { active: isTapPhim })}>
                <div className={cx('header')}>
                    <div
                        className={cx('box-icon')}
                        onClick={() => {
                            setIsTapPhim(false);
                        }}
                    >
                        <PrevIcon className={cx('icon')} />
                    </div>
                    <div className={cx('name')}>{nameVideo + ' - (' + source.length + ' tập)'}</div>
                </div>
                <div className={cx('box-gird')}>
                    <div className={cx('grid')}>
                        {rows.map((row, rowIndex) => (
                            <div key={rowIndex} className={cx('row')}>
                                {row.map((item, index) => (
                                    <Link
                                        key={index}
                                        onClick={() => setIsTapPhim(false)}
                                        to={config.routes.Player + '/' + slug}
                                        className={cx('item-img')}
                                        state={{
                                            name: item.filename,
                                            poster_url: poster,
                                            slug: slug ? slug : '',
                                            soTap: item.slug ? item.name : 0,
                                        }}
                                    >
                                        <div className={cx('img-video')}>
                                            <div className={cx('bg-img', 'background-hv')}></div>
                                            <Image className={cx('img')} src={urlImg + poster} alt={item.name} />
                                            <div
                                                className={cx('box-watching', {
                                                    active: handlecCompare(
                                                        parseInt(item.slug ? item.slug : item.name),
                                                        tapPhim + 1,
                                                    ),
                                                })}
                                            >
                                                <WatchingIcon className={cx('icon')} />
                                                <p>Đang xem</p>
                                            </div>
                                        </div>
                                        <div className={cx('desc')}>
                                            <div className={cx('name-video', 'line-clamp')}>{item.filename}</div>
                                            <div className={cx('tap-phim')}>
                                                {'Tập ' + item.slug ? 'Tập ' + item.name : item.slug || 'Tập Phim'}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={cx('player-video')}>
                <div className={cx('loading-video', 'loadingVideo', { hidden: !isLoadingVideo })}>
                    <ClipLoader size={50} color="#fff" loading={isLoadingVideo} className={cx('icon-loading')} />
                </div>
                <MediaPlayer
                    key={srcVideo}
                    className={cx('player')}
                    src={srcVideo}
                    viewType="video"
                    ref={videoRef}
                    streamType="on-demand"
                    onClick={() => handleClickVideo(isPlaying)}
                    logLevel="warn"
                    onError={(e) => console.log('error load source', e)}
                    crossOrigin
                    playsInline
                    title={nameVideo}
                    // poster={urlImg + poster}
                    onPlay={() => handlePlay(isPlaying)}
                    onPause={() => handlePlay(isPlaying)}
                    onFullscreenChange={() => setIsFullScreen(!isFullScreen)}
                    onVolumeChange={(e) => handleVolumeVideo(e)}
                    // onWaiting={(e) => handleLoadingVideo(!isLoadingVideo)}
                    onWaiting={(e) => handleLoadingVideo('onWaiting')}
                    onCanPlay={(e) => handleLoadingVideo('onCanPlay')}
                    onStalled={(e) => console.log('onStalled')}
                    onPlaying={(e) => handleLoadingVideo('onPlaying')}
                >
                    <MediaProvider>
                        <Poster
                            key={poster}
                            className="vds-poster"
                            src={urlImg + poster}
                            onError={(e) => {
                                console.log('error load poster', e);
                                showToast('error', 'Có lỗi khi tải poster', 7000);
                            }}
                        />
                    </MediaProvider>
                    <div className={cx('info-video')}>
                        <div className={cx('header')}>
                            <div className={cx('box-name')}>
                                <div className={cx('box-icon')} onClick={() => handleBack()}>
                                    <PrevIcon className={cx('icon')} />
                                </div>
                                <div className={cx('name')}> {nameVideo + ' | Tập ' + infoVideo['soTap']} </div>
                            </div>
                            <Link to={config.routes.Home}>
                                <Image className={cx('logo')} src={images.logo} />
                            </Link>
                        </div>
                    </div>

                    <div className={cx('btn-control')} onClick={(e) => e.stopPropagation()}>
                        <div className={cx('time-slide')}>
                            <div className={cx('vds-time-group')}>
                                <Time className={cx('vds-time')} />
                            </div>
                            <TimeSlider.Root className="vds-time-slider vds-slider">
                                <TimeSlider.Track className="vds-slider-track" />
                                <TimeSlider.TrackFill className="vds-slider-track-fill vds-slider-track" />
                                <TimeSlider.Progress className="vds-slider-progress vds-slider-track" />

                                <TimeSlider.Preview className="vds-slider-preview" noClamp>
                                    <TimeSlider.Thumbnail.Root
                                        src="/your_thumbnails.vtt"
                                        className="vds-slider-thumbnail vds-thumbnail"
                                    >
                                        <TimeSlider.Thumbnail.Img />
                                    </TimeSlider.Thumbnail.Root>
                                    <TimeSlider.Value className="vds-slider-value" />
                                </TimeSlider.Preview>

                                <TimeSlider.Thumb className="vds-slider-thumb" />
                            </TimeSlider.Root>
                            <div className={cx('vds-time-group')}>
                                <Time type="duration" className={cx('vds-time')} />
                            </div>
                        </div>
                        <div className={cx('control-group')}>
                            <div className={cx('group-left')}>
                                <SeekButton className={cx('vds-button', 'seek-btn', 'back')} seconds={-10}>
                                    <SeekBackward10Icon className="vds-icon" />
                                </SeekButton>

                                <PlayButton className="vds-button">
                                    <PlayIcon className={cx('play-icon', 'vds-icon', { hidden: isPlaying })} />
                                    <PauseIcon className={cx('pause-icon', 'vds-icon', { hidden: !isPlaying })} />
                                </PlayButton>
                                <SeekButton className={cx('vds-button', 'seek-btn', 'forward')} seconds={10}>
                                    <SeekForward10Icon className="vds-icon" />
                                </SeekButton>
                                <MuteButton className={cx('vds-button')}>
                                    <SoundMuteIcon className={cx('mute-icon', 'vds-icon', { hidden: !isMuteVolume })} />
                                    {/* <VolumeLowIcon className="volume-low-icon vds-icon" /> */}
                                    <SoundIcon
                                        className={cx('volume-high-icon', 'vds-icon', { hidden: isMuteVolume })}
                                    />
                                </MuteButton>
                                <VolumeSlider.Root className={cx('vds-slider', 'vds-slider-volume')}>
                                    <VolumeSlider.Track className={cx('vds-slider-track')} />
                                    <VolumeSlider.TrackFill
                                        className={cx('vds-slider-track-fill', 'vds-slider-track')}
                                    />
                                    <VolumeSlider.Preview className={cx('vds-slider-preview')} noClamp>
                                        <VolumeSlider.Value className={cx('vds-slider-value')} />
                                    </VolumeSlider.Preview>

                                    <VolumeSlider.Thumb className={cx('vds-slider-thumb')} />
                                </VolumeSlider.Root>
                            </div>
                            <div className={cx('group-right')}>
                                <Tooltip.Root>
                                    <Tooltip.Trigger asChild>
                                        <div className={cx('hv-cursor', 'so-tap')} onClick={() => handleSoTap()}>
                                            <DuplicateMediaIcon ref={refSoTap} className={cx('icon')} />
                                        </div>
                                    </Tooltip.Trigger>
                                    <Tooltip.Content
                                        className={cx('vds-tooltip-content', 'tooltip')}
                                        side="top"
                                        align="start"
                                    >
                                        Tập Phim
                                    </Tooltip.Content>
                                </Tooltip.Root>

                                {/* <SpeedSlider.Root
                                    className={cx('vds-slider', 'video-speed')}
                                    onValueChange={(value) => console.log('speed', value)}
                                    step={0.5}
                                >
                                    <SpeedSlider.Track className="vds-slider-track" />
                                    <SpeedSlider.TrackFill className="vds-slider-track-fill vds-slider-track" />
                                    <SpeedSlider.Thumb className="vds-slider-thumb" />

                                    <SpeedSlider.Steps class="vds-slider-steps">
                                        {(step) => <div className="vds-slider-step" key={String(step)} />}
                                    </SpeedSlider.Steps>
                                </SpeedSlider.Root> */}

                                <FullscreenButton className="vds-button">
                                    <Tooltip.Root>
                                        <Tooltip.Trigger asChild>
                                            <FullscreenIcon
                                                className={cx('fs-enter-icon', 'vds-icon', { hidden: isFullScreen })}
                                            />
                                        </Tooltip.Trigger>
                                        <Tooltip.Content
                                            className={cx('vds-tooltip-content', 'tooltip')}
                                            side="top"
                                            align="start"
                                        >
                                            Toàn màn hình
                                        </Tooltip.Content>
                                    </Tooltip.Root>

                                    <Tooltip.Root>
                                        <Tooltip.Trigger asChild>
                                            <FullscreenExitIcon
                                                className={cx('fs-exit-icon', 'vds-icon', { hidden: !isFullScreen })}
                                            />
                                        </Tooltip.Trigger>
                                        <Tooltip.Content
                                            className={cx('vds-tooltip-content', 'tooltip')}
                                            side="top"
                                            align="start"
                                        >
                                            Thoát toàn màn hình
                                        </Tooltip.Content>
                                    </Tooltip.Root>
                                </FullscreenButton>
                            </div>
                        </div>
                    </div>
                </MediaPlayer>
            </div>
        </div>
    );
}

export default Video;
