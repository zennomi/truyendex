import Image from "next/image"
import NetTromLogo from "../../assets/nettrom-logo.png"
import Link from "next/link"
import Iconify from "../iconify"

export default function TopNav() {
    return (
        <nav
            id="topnav"
            className="defaultscroll is-sticky bg-white dark:bg-slate-900"
        >
            <div className="container">
                {/* Logo container*/}
                <Link className="logo pl-0" href={"/"}>
                    <Image
                        src={NetTromLogo}
                        className="hidden dark:inline-block"
                        alt=""
                    />
                </Link>
                {/* End Logo container*/}
                <div className="menu-extras">
                    <div className="menu-item">
                        {/* Mobile menu toggle*/}
                        <a className="navbar-toggle" id="isToggle">
                            <div className="lines">
                                <span />
                                <span />
                                <span />
                            </div>
                        </a>
                        {/* End mobile menu toggle*/}
                    </div>
                </div>
                {/*Login button Start*/}
                <ul className="buy-button list-none mb-0">
                    <li className="inline mb-0">
                        <a
                            href="https://www.facebook.com/Zennomi"
                            target="_blank"
                            className="btn btn-icon rounded-full bg-indigo-600/5 hover:bg-indigo-600 border-indigo-600/10 hover:border-indigo-600 text-indigo-600 hover:text-white"
                        >
                            <Iconify icon="eva:facebook-fill" className="h-4 w-4" />
                        </a>
                    </li>
                    <li className="inline pl-1 mb-0">
                        <a
                            href="https://github.com/zennomi/truyendex"
                            target="_blank"
                            className="btn btn-icon rounded-full bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white"
                        >
                            <Iconify icon="eva:github-fill" className="h-4 w-4" />
                        </a>
                    </li>
                </ul>
                {/*Login button End*/}
                <div id="navigation">
                    {/* Navigation Menu*/}
                    <ul className="navigation-menu">
                        <li>
                            <Link href="/" className="sub-menu-item">
                                Trang chủ
                            </Link>
                        </li>
                        <li className="has-submenu parent-parent-menu-item">
                            <a href="javascript:void(0)">Landing</a>
                            <span className="menu-arrow" />
                            <ul className="submenu megamenu">
                                <li>
                                    <ul>
                                        <li>
                                            <a href="index-saas.html" className="sub-menu-item">
                                                Saas{" "}
                                                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ml-1">
                                                    Animation
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-classic-saas.html" className="sub-menu-item">
                                                Classic Saas{" "}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-modern-saas.html" className="sub-menu-item">
                                                Modern Saas{" "}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-apps.html" className="sub-menu-item">
                                                Application
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-classic-app.html" className="sub-menu-item">
                                                Classic App{" "}
                                                <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ml-1">
                                                    New
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-smartwatch.html" className="sub-menu-item">
                                                Smartwatch
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-marketing.html" className="sub-menu-item">
                                                Marketing
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-seo.html" className="sub-menu-item">
                                                SEO Agency{" "}
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <ul>
                                        <li>
                                            <a href="index-it-solution.html" className="sub-menu-item">
                                                IT Solution
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="index-it-solution-two.html"
                                                className="sub-menu-item"
                                            >
                                                It Solution Two{" "}
                                                <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ml-1">
                                                    New
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-digital-agency.html" className="sub-menu-item">
                                                Digital Agency
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-job.html" className="sub-menu-item">
                                                Job
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-restaurent.html" className="sub-menu-item">
                                                Restaurent
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-hosting.html" className="sub-menu-item">
                                                Hosting
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-gym.html" className="sub-menu-item">
                                                Gym{" "}
                                                <span className="bg-black dark:bg-slate-50 text-white dark:text-slate-900 text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ml-1">
                                                    Dark
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-nft.html" className="sub-menu-item">
                                                NFT Marketplace{" "}
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <ul>
                                        <li>
                                            <a href="index-startup.html" className="sub-menu-item">
                                                Startup
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-business.html" className="sub-menu-item">
                                                Business
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-corporate.html" className="sub-menu-item">
                                                Corporate
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-corporate-two.html" className="sub-menu-item">
                                                Corporate Two{" "}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-real-estate.html" className="sub-menu-item">
                                                Real Estate
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-consulting.html" className="sub-menu-item">
                                                Consulting{" "}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-insurance.html" className="sub-menu-item">
                                                Insurance{" "}
                                                <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ml-1">
                                                    New
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-construction.html" className="sub-menu-item">
                                                Construction{" "}
                                                <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ml-1">
                                                    New
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <ul>
                                        <li>
                                            <a href="index-personal.html" className="sub-menu-item">
                                                Personal
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-portfolio.html" className="sub-menu-item">
                                                Portfolio
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-photography.html" className="sub-menu-item">
                                                Photography{" "}
                                                <span className="bg-black dark:bg-slate-50 text-white dark:text-slate-900 text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ml-1">
                                                    Dark
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-studio.html" className="sub-menu-item">
                                                Studio
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-coworking.html" className="sub-menu-item">
                                                Co-Woriking
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-course.html" className="sub-menu-item">
                                                Online Courses{" "}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-hospital.html" className="sub-menu-item">
                                                Hospital
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-event.html" className="sub-menu-item">
                                                Event/Conference{" "}
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <ul>
                                        <li>
                                            <a href="index-crypto.html" className="sub-menu-item">
                                                Cryptocurrency{" "}
                                                <span className="bg-black dark:bg-slate-50 text-white dark:text-slate-900 text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ml-1">
                                                    Dark
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-landing-one.html" className="sub-menu-item">
                                                Landing One
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-landing-two.html" className="sub-menu-item">
                                                Landing Two
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-landing-three.html" className="sub-menu-item">
                                                Landing Three
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-landing-four.html" className="sub-menu-item">
                                                Landing Four
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-service.html" className="sub-menu-item">
                                                Service Provider
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-food-blog.html" className="sub-menu-item">
                                                Food Blog{" "}
                                            </a>
                                        </li>
                                        <li>
                                            <a href="index-blog.html" className="sub-menu-item">
                                                Blog{" "}
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className="has-submenu parent-parent-menu-item">
                            <a href="javascript:void(0)">Pages</a>
                            <span className="menu-arrow" />
                            <ul className="submenu">
                                <li className="has-submenu parent-menu-item">
                                    <a href="javascript:void(0)"> Company </a>
                                    <span className="submenu-arrow" />
                                    <ul className="submenu">
                                        <li>
                                            <a href="page-aboutus.html" className="sub-menu-item">
                                                {" "}
                                                About Us
                                            </a>
                                        </li>
                                        <li>
                                            <a href="page-services.html" className="sub-menu-item">
                                                Services
                                            </a>
                                        </li>
                                        <li>
                                            <a href="page-team.html" className="sub-menu-item">
                                                {" "}
                                                Team
                                            </a>
                                        </li>
                                        <li>
                                            <a href="page-pricing.html" className="sub-menu-item">
                                                Pricing
                                            </a>
                                        </li>
                                        <li>
                                            <a href="page-testimonial.html" className="sub-menu-item">
                                                Testimonial{" "}
                                                <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ml-1">
                                                    New
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="has-submenu parent-menu-item">
                                    <a href="javascript:void(0)"> Accounts</a>
                                    <span className="submenu-arrow" />
                                    <ul className="submenu">
                                        <li>
                                            <a href="user-profile.html" className="sub-menu-item">
                                                User Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a href="user-billing.html" className="sub-menu-item">
                                                Billing
                                            </a>
                                        </li>
                                        <li>
                                            <a href="user-payment.html" className="sub-menu-item">
                                                Payment
                                            </a>
                                        </li>
                                        <li>
                                            <a href="user-invoice.html" className="sub-menu-item">
                                                Invoice
                                            </a>
                                        </li>
                                        <li>
                                            <a href="user-social.html" className="sub-menu-item">
                                                Social
                                            </a>
                                        </li>
                                        <li>
                                            <a href="user-notification.html" className="sub-menu-item">
                                                Notification
                                            </a>
                                        </li>
                                        <li>
                                            <a href="user-setting.html" className="sub-menu-item">
                                                Setting
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="has-submenu parent-menu-item">
                                    <a href="javascript:void(0)"> Real Estate</a>
                                    <span className="submenu-arrow" />
                                    <ul className="submenu">
                                        <li>
                                            <a href="property-listing.html" className="sub-menu-item">
                                                Listing
                                            </a>
                                        </li>
                                        <li>
                                            <a href="property-detail.html" className="sub-menu-item">
                                                Property Detail
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="has-submenu parent-menu-item">
                                    <a href="javascript:void(0)"> Courses </a>
                                    <span className="submenu-arrow" />
                                    <ul className="submenu">
                                        <li>
                                            <a href="course-listing.html" className="sub-menu-item">
                                                Course Listing
                                            </a>
                                        </li>
                                        <li>
                                            <a href="course-detail.html" className="sub-menu-item">
                                                Course Detail
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="has-submenu parent-menu-item">
                                    <a href="javascript:void(0)"> NFT Market </a>
                                    <span className="submenu-arrow" />
                                    <ul className="submenu">
                                        <li>
                                            <a href="nft-explore.html" className="sub-menu-item">
                                                Explore
                                            </a>
                                        </li>
                                        <li>
                                            <a href="nft-auction.html" className="sub-menu-item">
                                                Auction
                                            </a>
                                        </li>
                                        <li>
                                            <a href="nft-collection.html" className="sub-menu-item">
                                                Collections
                                            </a>
                                        </li>
                                        <li>
                                            <a href="nft-creators.html" className="sub-menu-item">
                                                Creators
                                            </a>
                                        </li>
                                        <li>
                                            <a href="nft-wallet.html" className="sub-menu-item">
                                                Wallet
                                            </a>
                                        </li>
                                        <li>
                                            <a href="nft-create-item.html" className="sub-menu-item">
                                                Create NFT
                                            </a>
                                        </li>
                                        <li>
                                            <a href="nft-detail.html" className="sub-menu-item">
                                                Single NFT
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="food-recipe.html" className="sub-menu-item">
                                        Food Recipe{" "}
                                    </a>
                                </li>
                                <li className="has-submenu parent-menu-item">
                                    <a href="javascript:void(0)"> Photography </a>
                                    <span className="submenu-arrow" />
                                    <ul className="submenu">
                                        <li>
                                            <a href="photography-about.html" className="sub-menu-item">
                                                About Us
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="photography-portfolio.html"
                                                className="sub-menu-item"
                                            >
                                                Portfolio
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="has-submenu parent-menu-item">
                                    <a href="javascript:void(0)"> Job / Careers </a>
                                    <span className="submenu-arrow" />
                                    <ul className="submenu">
                                        <li>
                                            <a href="page-job-grid.html" className="sub-menu-item">
                                                All Jobs
                                            </a>
                                        </li>
                                        <li>
                                            <a href="page-job-detail.html" className="sub-menu-item">
                                                Job Detail
                                            </a>
                                        </li>
                                        <li>
                                            <a href="page-job-apply.html" className="sub-menu-item">
                                                Job Apply
                                            </a>
                                        </li>
                                        <li>
                                            <a href="page-job-candidates.html" className="sub-menu-item">
                                                Job Candidates
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="page-job-candidate-detail.html"
                                                className="sub-menu-item"
                                            >
                                                Candidate Detail
                                            </a>
                                        </li>
                                        <li>
                                            <a href="page-job-companies.html" className="sub-menu-item">
                                                All Companies
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="page-job-company-detail.html"
                                                className="sub-menu-item"
                                            >
                                                Company Detail
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="has-submenu parent-menu-item">
                                    <a href="javascript:void(0)"> Helpcenter </a>
                                    <span className="submenu-arrow" />
                                    <ul className="submenu">
                                        <li>
                                            <a href="helpcenter.html" className="sub-menu-item">
                                                Overview
                                            </a>
                                        </li>
                                        <li>
                                            <a href="helpcenter-faqs.html" className="sub-menu-item">
                                                FAQs
                                            </a>
                                        </li>
                                        <li>
                                            <a href="helpcenter-guides.html" className="sub-menu-item">
                                                Guides
                                            </a>
                                        </li>
                                        <li>
                                            <a href="helpcenter-support.html" className="sub-menu-item">
                                                Support
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="has-submenu parent-menu-item">
                                    <a href="javascript:void(0)">
                                        {" "}
                                        Blog{" "}
                                        <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ml-1">
                                            New
                                        </span>
                                    </a>
                                    <span className="submenu-arrow" />
                                    <ul className="submenu">
                                        <li>
                                            <a href="blog.html" className="sub-menu-item">
                                                Blogs
                                            </a>
                                        </li>
                                        <li>
                                            <a href="blog-sidebar.html" className="sub-menu-item">
                                                Blogs &amp; Sidebar
                                            </a>
                                        </li>
                                        <li>
                                            <a href="blog-detail.html" className="sub-menu-item">
                                                Blog Detail
                                            </a>
                                        </li>
                                        <li className="has-submenu child-menu-item">
                                            <a href="javascript:void(0)">
                                                {" "}
                                                Blog Posts{" "}
                                                <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ml-1">
                                                    New
                                                </span>
                                            </a>
                                            <span className="submenu-arrow" />
                                            <ul className="submenu">
                                                <li>
                                                    <a
                                                        href="blog-standard-post.html"
                                                        className="sub-menu-item"
                                                    >
                                                        Standard Post
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="blog-slider-post.html" className="sub-menu-item">
                                                        Slider Post
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="blog-gallery-post.html"
                                                        className="sub-menu-item"
                                                    >
                                                        Gallery Post
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="blog-youtube-post.html"
                                                        className="sub-menu-item"
                                                    >
                                                        Youtube Post
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="blog-vimeo-post.html" className="sub-menu-item">
                                                        Vimeo Post
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="blog-audio-post.html" className="sub-menu-item">
                                                        Audio Post
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="blog-blockquote-post.html"
                                                        className="sub-menu-item"
                                                    >
                                                        Blockquote
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="blog-left-sidebar-post.html"
                                                        className="sub-menu-item"
                                                    >
                                                        Left Sidebar
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li className="has-submenu parent-menu-item">
                                    <a href="javascript:void(0)"> Email Template</a>
                                    <span className="submenu-arrow" />
                                    <ul className="submenu">
                                        <li>
                                            <a href="email-confirmation.html" className="sub-menu-item">
                                                Confirmation
                                            </a>
                                        </li>
                                        <li>
                                            <a href="email-password-reset.html" className="sub-menu-item">
                                                Reset Password
                                            </a>
                                        </li>
                                        <li>
                                            <a href="email-alert.html" className="sub-menu-item">
                                                Alert
                                            </a>
                                        </li>
                                        <li>
                                            <a href="email-invoice.html" className="sub-menu-item">
                                                Invoice
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="has-submenu parent-menu-item">
                                    <a href="javascript:void(0)"> Auth Pages </a>
                                    <span className="submenu-arrow" />
                                    <ul className="submenu">
                                        <li>
                                            <a href="auth-login.html" className="sub-menu-item">
                                                Login
                                            </a>
                                        </li>
                                        <li>
                                            <a href="auth-signup.html" className="sub-menu-item">
                                                Signup
                                            </a>
                                        </li>
                                        <li>
                                            <a href="auth-re-password.html" className="sub-menu-item">
                                                Reset Password
                                            </a>
                                        </li>
                                        <li>
                                            <a href="auth-lock-screen.html" className="sub-menu-item">
                                                Lock Screen
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="has-submenu parent-menu-item">
                                    <a href="javascript:void(0)"> Utility </a>
                                    <span className="submenu-arrow" />
                                    <ul className="submenu">
                                        <li>
                                            <a href="page-terms.html" className="sub-menu-item">
                                                Terms of Services
                                            </a>
                                        </li>
                                        <li>
                                            <a href="page-privacy.html" className="sub-menu-item">
                                                Privacy Policy
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="has-submenu parent-menu-item">
                                    <a href="javascript:void(0)"> Special</a>
                                    <span className="submenu-arrow" />
                                    <ul className="submenu">
                                        <li>
                                            <a href="page-comingsoon.html" className="sub-menu-item">
                                                Coming Soon
                                            </a>
                                        </li>
                                        <li>
                                            <a href="page-maintenance.html" className="sub-menu-item">
                                                Maintenance
                                            </a>
                                        </li>
                                        <li>
                                            <a href="page-error.html" className="sub-menu-item">
                                                Error
                                            </a>
                                        </li>
                                        <li>
                                            <a href="page-thankyou.html" className="sub-menu-item">
                                                Thank you
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="has-submenu parent-menu-item">
                                    <a href="javascript:void(0)"> Contact </a>
                                    <span className="submenu-arrow" />
                                    <ul className="submenu">
                                        <li>
                                            <a href="contact-detail.html" className="sub-menu-item">
                                                Contact Detail
                                            </a>
                                        </li>
                                        <li>
                                            <a href="contact-one.html" className="sub-menu-item">
                                                Contact One
                                            </a>
                                        </li>
                                        <li>
                                            <a href="contact-two.html" className="sub-menu-item">
                                                Contact Two
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="has-submenu parent-menu-item">
                                    <a href="javascript:void(0)"> Multi Level Menu</a>
                                    <span className="submenu-arrow" />
                                    <ul className="submenu">
                                        <li>
                                            <a href="javascript:void(0)" className="sub-menu-item">
                                                Level 1.0
                                            </a>
                                        </li>
                                        <li className="has-submenu child-menu-item">
                                            <a href="javascript:void(0)"> Level 2.0 </a>
                                            <span className="submenu-arrow" />
                                            <ul className="submenu">
                                                <li>
                                                    <a href="javascript:void(0)" className="sub-menu-item">
                                                        Level 2.1
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)" className="sub-menu-item">
                                                        Level 2.2
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className="has-submenu parent-parent-menu-item">
                            <a href="javascript:void(0)">Portfolio</a>
                            <span className="menu-arrow" />
                            <ul className="submenu megamenu">
                                <li>
                                    <ul>
                                        <li className="megamenu-head">Modern Portfolio</li>
                                        <li>
                                            <a href="portfolio-modern-two.html" className="sub-menu-item">
                                                Two Column
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="portfolio-modern-three.html"
                                                className="sub-menu-item"
                                            >
                                                Three Column
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="portfolio-modern-four.html"
                                                className="sub-menu-item"
                                            >
                                                Four Column
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="portfolio-modern-five.html"
                                                className="sub-menu-item"
                                            >
                                                Five Column
                                            </a>
                                        </li>
                                        <li>
                                            <a href="portfolio-modern-six.html" className="sub-menu-item">
                                                Six Column
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <ul>
                                        <li className="megamenu-head">Classic Portfolio</li>
                                        <li>
                                            <a
                                                href="portfolio-classic-two.html"
                                                className="sub-menu-item"
                                            >
                                                Two Column
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="portfolio-classic-three.html"
                                                className="sub-menu-item"
                                            >
                                                Three Column
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="portfolio-classic-four.html"
                                                className="sub-menu-item"
                                            >
                                                Four Column
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="portfolio-classic-five.html"
                                                className="sub-menu-item"
                                            >
                                                Five Column
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="portfolio-classic-six.html"
                                                className="sub-menu-item"
                                            >
                                                Six Column
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <ul>
                                        <li className="megamenu-head">Creative Portfolio</li>
                                        <li>
                                            <a
                                                href="portfolio-creative-two.html"
                                                className="sub-menu-item"
                                            >
                                                Two Column
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="portfolio-creative-three.html"
                                                className="sub-menu-item"
                                            >
                                                Three Column
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="portfolio-creative-four.html"
                                                className="sub-menu-item"
                                            >
                                                Four Column
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="portfolio-creative-five.html"
                                                className="sub-menu-item"
                                            >
                                                Five Column
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="portfolio-creative-six.html"
                                                className="sub-menu-item"
                                            >
                                                Six Column
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <ul>
                                        <li className="megamenu-head">Masonry Portfolio</li>
                                        <li>
                                            <a
                                                href="portfolio-masonry-two.html"
                                                className="sub-menu-item"
                                            >
                                                Two Column
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="portfolio-masonry-three.html"
                                                className="sub-menu-item"
                                            >
                                                Three Column
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="portfolio-masonry-four.html"
                                                className="sub-menu-item"
                                            >
                                                Four Column
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="portfolio-masonry-five.html"
                                                className="sub-menu-item"
                                            >
                                                Five Column
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="portfolio-masonry-six.html"
                                                className="sub-menu-item"
                                            >
                                                Six Column
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <ul>
                                        <li className="megamenu-head">Portfolio Detail</li>
                                        <li>
                                            <a href="portfolio-detail-one.html" className="sub-menu-item">
                                                Portfolio One
                                            </a>
                                        </li>
                                        <li>
                                            <a href="portfolio-detail-two.html" className="sub-menu-item">
                                                Portfolio Two
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="portfolio-detail-three.html"
                                                className="sub-menu-item"
                                            >
                                                Portfolio Three
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="portfolio-detail-four.html"
                                                className="sub-menu-item"
                                            >
                                                Portfolio Four
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className="has-submenu parent-menu-item">
                            <a href="javascript:void(0)">Docs</a>
                            <span className="menu-arrow" />
                            <ul className="submenu">
                                <li>
                                    <a href="documentation.html" className="sub-menu-item">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="changelog.html" className="sub-menu-item">
                                        Changelog
                                    </a>
                                </li>
                                <li>
                                    <a href="widget.html" className="sub-menu-item">
                                        Widget
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="contact-one.html" className="sub-menu-item">
                                Contact
                            </a>
                        </li>
                    </ul>
                    {/*end navigation menu*/}
                </div>
                {/*end navigation*/}
            </div>
            {/*end container*/}
        </nav>
    )
}