import CommentEditorWrapper from "@/components/core/discussion/comment-editor-wrapper";

export default function DiscussionPage() {
  return (
    <section className="relative pb-16 pt-36 md:pb-24 md:pt-40">
      <div className="container relative">
        <div className="grid grid-cols-1 gap-[30px] md:grid-cols-12">
          <div className="md:col-span-6 lg:col-span-8">
            <div className="rounded-md p-6 shadow dark:shadow-gray-800">
              <img
                src="assets/images/blog/slide02.jpg"
                className="rounded-md"
                alt=""
              />
              <div className="mt-12 text-center">
                <span className="inline-block h-5 rounded-full bg-indigo-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                  Technology
                </span>
                <h3 className="my-3 text-[26px] font-semibold">
                  My Very Minimal <br /> Interior Design Ideas
                </h3>
                <ul className="mt-6 list-none">
                  <li className="mx-4 inline-block font-semibold text-slate-400">
                    {" "}
                    <span className="block text-slate-900 dark:text-white">
                      Client :
                    </span>{" "}
                    <span className="block">Calvin Carlo</span>
                  </li>
                  <li className="mx-4 inline-block font-semibold text-slate-400">
                    {" "}
                    <span className="block text-slate-900 dark:text-white">
                      Date :
                    </span>{" "}
                    <span className="block">23th May, 2022</span>
                  </li>
                  <li className="mx-4 inline-block font-semibold text-slate-400">
                    {" "}
                    <span className="block text-slate-900 dark:text-white">
                      Time :
                    </span>{" "}
                    <span className="block">8 Min Read</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <p className="text-slate-400">
                  The most well-known dummy text is the 'Lorem Ipsum', which is
                  said to have originated in the 16th century. Lorem Ipsum is
                  composed in a pseudo-Latin language which more or less
                  corresponds to 'proper' Latin. It contains a series of real
                  Latin words. This ancient dummy text is also incomprehensible,
                  but it imitates the rhythm of most European languages in Latin
                  script.
                </p>
                <p className="mt-3 rounded-ee-xl rounded-ss-xl border-x-4 border-indigo-600 p-3 italic text-slate-400">
                  " There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable. "
                </p>
                <p className="mt-3 text-slate-400">
                  The advantage of its Latin origin and the relative
                  meaninglessness of Lorum Ipsum is that the text does not
                  attract attention to itself or distract the viewer's attention
                  from the layout.
                </p>
              </div>
            </div>
            <div className="mt-8 rounded-md p-6 shadow dark:shadow-gray-800">
              <h5 className="text-lg font-semibold">Để lại bình luận:</h5>
              <div className="">
                <CommentEditorWrapper />
              </div>
            </div>
            <div className="mt-8 rounded-md p-6 shadow dark:shadow-gray-800">
              <h5 className="text-lg font-semibold">Comments:</h5>
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="assets/images/client/01.jpg"
                      className="size-11 rounded-full shadow"
                      alt=""
                    />
                    <div className="ms-3 flex-1">
                      <a
                        href=""
                        className="text-lg font-semibold duration-500 hover:text-indigo-600"
                      >
                        Calvin Carlo
                      </a>
                      <p className="text-sm text-slate-400">
                        6th May 2022 at 01:25 pm
                      </p>
                    </div>
                  </div>
                  <a
                    href=""
                    className="ms-5 text-slate-400 duration-500 hover:text-indigo-600"
                  >
                    <i className="mdi mdi-reply" /> Reply
                  </a>
                </div>
                <div className="mt-6 rounded-md bg-gray-50 p-4 shadow dark:bg-slate-800 dark:shadow-gray-800">
                  <p className="italic text-slate-400">
                    " There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour "
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="assets/images/client/02.jpg"
                      className="size-11 rounded-full shadow"
                      alt=""
                    />
                    <div className="ms-3 flex-1">
                      <a
                        href=""
                        className="text-lg font-semibold duration-500 hover:text-indigo-600"
                      >
                        Calvin Carlo
                      </a>
                      <p className="text-sm text-slate-400">
                        6th May 2022 at 01:25 pm
                      </p>
                    </div>
                  </div>
                  <a
                    href=""
                    className="ms-5 text-slate-400 duration-500 hover:text-indigo-600"
                  >
                    <i className="mdi mdi-reply" /> Reply
                  </a>
                </div>
                <div className="mt-6 rounded-md bg-gray-50 p-4 shadow dark:bg-slate-800 dark:shadow-gray-800">
                  <p className="italic text-slate-400">
                    " There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour "
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="assets/images/client/03.jpg"
                      className="size-11 rounded-full shadow"
                      alt=""
                    />
                    <div className="ms-3 flex-1">
                      <a
                        href=""
                        className="text-lg font-semibold duration-500 hover:text-indigo-600"
                      >
                        Calvin Carlo
                      </a>
                      <p className="text-sm text-slate-400">
                        6th May 2022 at 01:25 pm
                      </p>
                    </div>
                  </div>
                  <a
                    href=""
                    className="ms-5 text-slate-400 duration-500 hover:text-indigo-600"
                  >
                    <i className="mdi mdi-reply" /> Reply
                  </a>
                </div>
                <div className="mt-6 rounded-md bg-gray-50 p-4 shadow dark:bg-slate-800 dark:shadow-gray-800">
                  <p className="italic text-slate-400">
                    " There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour "
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="assets/images/client/04.jpg"
                      className="size-11 rounded-full shadow"
                      alt=""
                    />
                    <div className="ms-3 flex-1">
                      <a
                        href=""
                        className="text-lg font-semibold duration-500 hover:text-indigo-600"
                      >
                        Calvin Carlo
                      </a>
                      <p className="text-sm text-slate-400">
                        6th May 2022 at 01:25 pm
                      </p>
                    </div>
                  </div>
                  <a
                    href=""
                    className="ms-5 text-slate-400 duration-500 hover:text-indigo-600"
                  >
                    <i className="mdi mdi-reply" /> Reply
                  </a>
                </div>
                <div className="mt-6 rounded-md bg-gray-50 p-4 shadow dark:bg-slate-800 dark:shadow-gray-800">
                  <p className="italic text-slate-400">
                    " There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour "
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-6 lg:col-span-4">
            <div className="sticky top-20">
              <h5 className="rounded-md bg-gray-50 p-2 text-center text-lg font-semibold shadow dark:bg-slate-800 dark:shadow-gray-800">
                Author
              </h5>
              <div className="mt-8 text-center">
                <img
                  src="assets/images/client/05.jpg"
                  className="mx-auto mb-4 size-24 rounded-full shadow"
                  alt=""
                />
                <a
                  href=""
                  className="text-lg font-semibold duration-500 hover:text-indigo-600"
                >
                  Cristina Romsey
                </a>
                <p className="text-slate-400">Content Writer</p>
              </div>
              <h5 className="mt-8 rounded-md bg-gray-50 p-2 text-center text-lg font-semibold shadow dark:bg-slate-800 dark:shadow-gray-800">
                Recent post
              </h5>
              <div className="mt-8 flex items-center">
                <img
                  src="assets/images/blog/06.jpg"
                  className="h-16 rounded-md shadow dark:shadow-gray-800"
                  alt=""
                />
                <div className="ms-3">
                  <a href="" className="font-semibold hover:text-indigo-600">
                    Consultant Business
                  </a>
                  <p className="text-sm text-slate-400">1st May 2022</p>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <img
                  src="assets/images/blog/07.jpg"
                  className="h-16 rounded-md shadow dark:shadow-gray-800"
                  alt=""
                />
                <div className="ms-3">
                  <a href="" className="font-semibold hover:text-indigo-600">
                    Grow Your Business
                  </a>
                  <p className="text-sm text-slate-400">1st May 2022</p>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <img
                  src="assets/images/blog/08.jpg"
                  className="h-16 rounded-md shadow dark:shadow-gray-800"
                  alt=""
                />
                <div className="ms-3">
                  <a href="" className="font-semibold hover:text-indigo-600">
                    Look On The Glorious Balance
                  </a>
                  <p className="text-sm text-slate-400">1st May 2022</p>
                </div>
              </div>
              <h5 className="mt-8 rounded-md bg-gray-50 p-2 text-center text-lg font-semibold shadow dark:bg-slate-800 dark:shadow-gray-800">
                Social sites
              </h5>
              <ul className="mt-8 list-none text-center">
                <li className="inline">
                  <a
                    href=""
                    className="inline-flex size-8 items-center justify-center rounded-md border border-gray-100 text-center align-middle text-base tracking-wide text-slate-400 duration-500 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white dark:border-gray-800"
                  >
                    <i data-feather="facebook" className="size-4" />
                  </a>
                </li>
                <li className="inline">
                  <a
                    href=""
                    className="inline-flex size-8 items-center justify-center rounded-md border border-gray-100 text-center align-middle text-base tracking-wide text-slate-400 duration-500 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white dark:border-gray-800"
                  >
                    <i data-feather="instagram" className="size-4" />
                  </a>
                </li>
                <li className="inline">
                  <a
                    href=""
                    className="inline-flex size-8 items-center justify-center rounded-md border border-gray-100 text-center align-middle text-base tracking-wide text-slate-400 duration-500 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white dark:border-gray-800"
                  >
                    <i data-feather="twitter" className="size-4" />
                  </a>
                </li>
                <li className="inline">
                  <a
                    href=""
                    className="inline-flex size-8 items-center justify-center rounded-md border border-gray-100 text-center align-middle text-base tracking-wide text-slate-400 duration-500 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white dark:border-gray-800"
                  >
                    <i data-feather="linkedin" className="size-4" />
                  </a>
                </li>
                <li className="inline">
                  <a
                    href=""
                    className="inline-flex size-8 items-center justify-center rounded-md border border-gray-100 text-center align-middle text-base tracking-wide text-slate-400 duration-500 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white dark:border-gray-800"
                  >
                    <i data-feather="github" className="size-4" />
                  </a>
                </li>
                <li className="inline">
                  <a
                    href=""
                    className="inline-flex size-8 items-center justify-center rounded-md border border-gray-100 text-center align-middle text-base tracking-wide text-slate-400 duration-500 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white dark:border-gray-800"
                  >
                    <i data-feather="youtube" className="size-4" />
                  </a>
                </li>
                <li className="inline">
                  <a
                    href=""
                    className="inline-flex size-8 items-center justify-center rounded-md border border-gray-100 text-center align-middle text-base tracking-wide text-slate-400 duration-500 hover:border-indigo-600 hover:bg-indigo-600 hover:text-white dark:border-gray-800"
                  >
                    <i data-feather="gitlab" className="size-4" />
                  </a>
                </li>
              </ul>
              {/*end icon*/}
              <h5 className="mt-8 rounded-md bg-gray-50 p-2 text-center text-lg font-semibold shadow dark:bg-slate-800 dark:shadow-gray-800">
                Tagscloud
              </h5>
              <ul className="mt-8 list-none text-center">
                <li className="m-2 inline-block">
                  <a
                    href=""
                    className="rounded-md bg-gray-50 px-3 py-1 text-sm text-slate-400 shadow duration-500 hover:bg-indigo-600 hover:text-white dark:bg-slate-800 dark:shadow-gray-800 dark:hover:bg-indigo-600 dark:hover:text-white"
                  >
                    Business
                  </a>
                </li>
                <li className="m-2 inline-block">
                  <a
                    href=""
                    className="rounded-md bg-gray-50 px-3 py-1 text-sm text-slate-400 shadow duration-500 hover:bg-indigo-600 hover:text-white dark:bg-slate-800 dark:shadow-gray-800 dark:hover:bg-indigo-600 dark:hover:text-white"
                  >
                    Finance
                  </a>
                </li>
                <li className="m-2 inline-block">
                  <a
                    href=""
                    className="rounded-md bg-gray-50 px-3 py-1 text-sm text-slate-400 shadow duration-500 hover:bg-indigo-600 hover:text-white dark:bg-slate-800 dark:shadow-gray-800 dark:hover:bg-indigo-600 dark:hover:text-white"
                  >
                    Marketing
                  </a>
                </li>
                <li className="m-2 inline-block">
                  <a
                    href=""
                    className="rounded-md bg-gray-50 px-3 py-1 text-sm text-slate-400 shadow duration-500 hover:bg-indigo-600 hover:text-white dark:bg-slate-800 dark:shadow-gray-800 dark:hover:bg-indigo-600 dark:hover:text-white"
                  >
                    Fashion
                  </a>
                </li>
                <li className="m-2 inline-block">
                  <a
                    href=""
                    className="rounded-md bg-gray-50 px-3 py-1 text-sm text-slate-400 shadow duration-500 hover:bg-indigo-600 hover:text-white dark:bg-slate-800 dark:shadow-gray-800 dark:hover:bg-indigo-600 dark:hover:text-white"
                  >
                    Bride
                  </a>
                </li>
                <li className="m-2 inline-block">
                  <a
                    href=""
                    className="rounded-md bg-gray-50 px-3 py-1 text-sm text-slate-400 shadow duration-500 hover:bg-indigo-600 hover:text-white dark:bg-slate-800 dark:shadow-gray-800 dark:hover:bg-indigo-600 dark:hover:text-white"
                  >
                    Lifestyle
                  </a>
                </li>
                <li className="m-2 inline-block">
                  <a
                    href=""
                    className="rounded-md bg-gray-50 px-3 py-1 text-sm text-slate-400 shadow duration-500 hover:bg-indigo-600 hover:text-white dark:bg-slate-800 dark:shadow-gray-800 dark:hover:bg-indigo-600 dark:hover:text-white"
                  >
                    Travel
                  </a>
                </li>
                <li className="m-2 inline-block">
                  <a
                    href=""
                    className="rounded-md bg-gray-50 px-3 py-1 text-sm text-slate-400 shadow duration-500 hover:bg-indigo-600 hover:text-white dark:bg-slate-800 dark:shadow-gray-800 dark:hover:bg-indigo-600 dark:hover:text-white"
                  >
                    Beauty
                  </a>
                </li>
                <li className="m-2 inline-block">
                  <a
                    href=""
                    className="rounded-md bg-gray-50 px-3 py-1 text-sm text-slate-400 shadow duration-500 hover:bg-indigo-600 hover:text-white dark:bg-slate-800 dark:shadow-gray-800 dark:hover:bg-indigo-600 dark:hover:text-white"
                  >
                    Video
                  </a>
                </li>
                <li className="m-2 inline-block">
                  <a
                    href=""
                    className="rounded-md bg-gray-50 px-3 py-1 text-sm text-slate-400 shadow duration-500 hover:bg-indigo-600 hover:text-white dark:bg-slate-800 dark:shadow-gray-800 dark:hover:bg-indigo-600 dark:hover:text-white"
                  >
                    Audio
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/*end grid*/}
      </div>
      {/*end container*/}
      <div className="container relative mt-16 md:mt-24">
        <div className="justify-center md:flex">
          <div className="text-center lg:w-2/3">
            <h3 className="mb-6 text-2xl font-semibold leading-normal md:text-3xl md:leading-normal">
              Subscribe our weekly subscription
            </h3>
            <p className="mx-auto max-w-xl text-slate-400">
              Add some text to explain benefits of subscripton on your services.
              We'll send you the best of our blog just once a weekly.
            </p>
            <div className="mt-8">
              <div className="subcribe-form text-center">
                <form className="relative mx-auto max-w-xl">
                  <input
                    type="email"
                    id="subemail"
                    name="name"
                    className="h-[50px] w-full rounded-full border border-gray-100 bg-white/70 py-4 pe-40 ps-6 text-black outline-none dark:border-gray-700 dark:bg-slate-900/70 dark:text-white"
                    placeholder="Enter your email id.."
                  />
                  <button
                    type="submit"
                    className="absolute end-[3px] top-[2px] inline-block h-[46px] rounded-full border border-indigo-600 bg-indigo-600 px-5 py-2 text-center align-middle text-base font-semibold tracking-wide text-white duration-500 hover:border-indigo-700 hover:bg-indigo-700"
                  >
                    Subcribe Now
                  </button>
                </form>
                {/*end form*/}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*end container*/}
    </section>
  );
}
