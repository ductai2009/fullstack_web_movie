import classNames from 'classnames/bind';
import style from './Footer.module.css';
import Image from '@/components/Image';
import images from '@/assets/image';
import { FaceBookDefaultIcon, InstagramDefaultIcon, TikTokDefaultIcon, YoutubeDefaultIcon } from '@/components/Icon';

function Footer() {
    const cx = classNames.bind(style);
    return (
        <div className={cx('section', 'footer', 'mt-7 pb-5 flex flex-col text-[var(--while)] bg-[#181a23]')}>
            <div className={cx('line-horizontal', 'flex w-full h-[1px] bg-[rgba(255,255,255,0.6)] !mb-[20px]')}></div>
            <div className={cx('wrapper' , 'flex w-[80%] !mr-auto !ml-auto flex-col')}>
                <Image className={cx('img-logo', 'w-[150px] mb-[10px]')} src={images.logo} alt="logo"></Image>
                <div className={cx('wrapper_content', 'flex justify-between flex-wrap')}>
                    <div className={cx('footer-content', 'flex flex-col gap-[15px] w-1/4 min-w-[330px]')}>
                        <div className={cx('content')}>
                            Galaxy Play là dịch vụ được cung cấp bởi Công ty Cổ Phần Galaxy Play, thành viên của Công ty
                            Cổ Phần Giải Trí và Giáo Dục Galaxy (GEE.,JSC)
                        </div>
                        <div className={cx('content')}>
                            Địa chỉ: 59 Võ Nguyên Giáp, Phường Thảo Điền, Thành Phố Thủ Đức, Thành Phố Hồ Chí Minh, Việt
                            Nam.
                        </div>
                        <div className={cx('content')}>Mã số doanh nghiệp: 0106539659.</div>
                        <div className={cx('content')}>Ngày cấp mã số doanh nghiệp: 15/5/2014.</div>
                        <div className={cx('content')}>Nơi cấp: Sở kế hoạch và đầu tư thành phố Hà Nội.</div>
                        <Image className={cx('img-informed', 'w-[150px] !mb-[10px]')} src={images.informed} alt="informed"></Image>
                    </div>
                    <div className={cx('footer-info', 'flex flex-col gap-[15px]')}>
                        <div className={cx('title')}>GIỚI THIỆU</div>
                        <div className={cx('desc', 'no-underline text-[1.5rem] text-[#9ea0a8] cursor-pointer')}>Quy chế sử dụng Dịch vụ</div>
                        <div className={cx('desc', 'no-underline text-[1.5rem] text-[#9ea0a8] cursor-pointer')}>Chính sách bảo mật</div>
                        <div className={cx('desc', 'no-underline text-[1.5rem] text-[#9ea0a8] cursor-pointer')}>Khuyến mãi</div>
                    </div>
                    <div className={cx('footer-support', 'flex flex-col gap-[15px]')}>
                        <div className={cx('title')}>HỖ TRỢ</div>
                        <div className={cx('desc', 'no-underline text-[1.5rem] text-[#9ea0a8] cursor-pointer')}>1900 8675 (24/7)</div>
                        <div className={cx('desc', 'no-underline text-[1.5rem] text-[#9ea0a8] cursor-pointer')}>play@galaxy.com.vn</div>
                        <div className={cx('desc', 'no-underline text-[1.5rem] text-[#9ea0a8] cursor-pointer')}>https://galaxyplay.vn/help</div>
                    </div>
                    <div className={cx('footer-download', 'flex flex-col gap-[15px]')}>
                        <div className={cx('title')}>TẢI ỨNG DỤNG</div>
                        <div className={cx('box-img', 'flex gap-[10px]')}>
                            <Image
                                className={cx('img-android_app','w-[150px] cursor-pointer')}
                                src={images.android_app_download_button}
                                alt="android_app_download_button"
                            ></Image>
                            <Image
                                className={cx('img-ios_app' ,'w-[150px] cursor-pointer')}
                                src={images.ios_app_download_button}
                                alt="ios_app_download_button"
                            ></Image>
                        </div>
                        <div className={cx('title')}>KẾT NỐI VỚI CHÚNG TÔI</div>
                        <div className={cx('box-img', 'box-icon', 'flex gap-[25px]')}>
                            <FaceBookDefaultIcon />
                            <InstagramDefaultIcon />
                            <YoutubeDefaultIcon />
                            <TikTokDefaultIcon />
                            <Image
                                className={cx('icon-img' , 'w-[40px] h-[40px]')}
                                src={images.zalo_default}
                                alt="android_app_download_button"
                            ></Image>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
