// Page Components START
import Image from 'next/image'
import Metadata from '@components/MetaData'
import { FadeContainer, headingFromLeft, opacityVariant, popUp } from '@content/FramerMotionVariants'
import AnimatedHeading from '@components/FramerMotion/AnimatedHeading'
import { homeProfileImage } from '@utils/utils'
import getRSS from '@lib/generateRSS'
import generateSitemap from '@lib/sitemap'
import { motion } from 'framer-motion'
import { FiDownload } from 'react-icons/fi'
import pageMeta from '@content/meta'
import staticData from '@content/StaticData'
import React from 'react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getProfileInfo } from '@lib/backendAPI'
import { ProfileType, ExperienceType } from '@lib/types'
import { BsGithub, BsLinkedin, BsTwitter, BsFacebook } from 'react-icons/bs'
import Loader from '@components/Loader'
import NoData from "@components/NoData"
import Experience from '@content/Experience';
import BlogsData from '@content/Blogs';
import dynamic from 'next/dynamic'

const ExperienceSection = dynamic(() => import('@components/Home/ExperienceSection'), {
  loading: () => <Loader />,
})

const BlogsSection = dynamic(() => import('@components/Home/BlogsSection'), {
  loading: () => <Loader />,
})

const Contact = dynamic(() => import('@components/Contact'), {
  loading: () => <Loader />,
})

export default function Home() {
  // Loaders
  const [experiencesLoading, setExperiencesLoading] = useState(true)
  const [blogsLoading, setBlogsLoading] = useState(true)

  const [profileInfo, setProfileInfo] = useState<ProfileType>()

  const fetchProfileInfo = async () => {
    const profileData: ProfileType = await getProfileInfo()
    setProfileInfo(profileData)
  }

  useEffect(() => {
    fetchProfileInfo()
    if (BlogsData.length) {
      setBlogsLoading(false);
    }
    if (Experience.length) {
      setExperiencesLoading(false);
    }
  }, [])

  const latest_experience: ExperienceType = Experience[0]

  return (
    <>
      <Metadata
        title="Davee Scott's Portfolio"
        description={pageMeta.home.description}
        previewImage={pageMeta.home.image}
        keywords={pageMeta.home.keywords}
      />
      <div className="relative max-w-4xl mx-auto bg-darkWhitePrimary dark:bg-darkPrimary dark:text-gray-100 2xl:max-w-5xl 3xl:max-w-7xl">
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={FadeContainer}
          viewport={{ once: true }}
          className="grid min-h-screen py-20 place-content-center"
        >
          <div className="relative flex flex-col items-center w-full gap-10 mx-auto">
            <motion.div
              variants={popUp}
              className="relative flex items-center justify-center p-3 rounded-full overflow-hidden w-44 h-44 xs:w-64 xs:h-64 before:absolute before:inset-0 before:border-t-4 before:border-b-4 before:border-black before:dark:border-white before:rounded-full before:animate-photo-spin"
            >
              <Image
                src={profileInfo?.image || homeProfileImage}
                className="rounded-full shadow filter"
                width={933}
                height={933}
                alt="Davee Scott's Profile Image"
                quality={60}
              // priority
              />
            </motion.div>

            <div className="flex flex-col w-full gap-3 p-5 text-center select-none">
              <div className="flex flex-col gap-1">
                <motion.h1 variants={opacityVariant} className="text-5xl font-bold lg:text-6xl font-arial">
                  {profileInfo?.name || staticData.personal.name}
                  <span className="ml-4 text-5xl font-light">
                    ({profileInfo?.nickname || staticData.personal.nickname})
                  </span>
                </motion.h1>
                <motion.p
                  variants={opacityVariant}
                  className="font-medium text-xs md:text-sm lg:text-2xl text-[#383838] dark:text-gray-200 mt-4"
                >
                  <span>{latest_experience?.designation || staticData.personal.current_designation}</span>
                  <span className="text-xs md:text-sm lg:text-xl mx-2 italic">at</span>
                  <span>{"Digital World"}</span>
                </motion.p>
              </div>

              <motion.p
                variants={opacityVariant}
                className="text-[#474747] dark:text-gray-300 font-medium text-sm md:text-base text-center"
              >
                {profileInfo?.about || staticData.personal.about}
              </motion.p>

              <div className="flex items-center justify-center p-4">
                <div className="w-1/2 h-0.5 bg-gradient-to-r from-gray-300 via-transparent to-gray-300"></div>
              </div>

              {/* Contact Section */}
              <motion.div
                variants={opacityVariant}
                className="text-[#474747] dark:text-gray-300 font-small font-light text-sm md:text-base text-center"
              >
                {/* Address */}
                <div>Address: {'MD, Brandywine, USA'}</div>
                {/* Email */}
                <div className="mt-2">
                  <span>Email: </span>
                  <span className="text-sky-800 dark:text-sky-400">
                    <a href='daveescott0509@gmail.com'>
                      {'daveescott0509@gmail.com'}
                    </a>
                  </span>
                </div>
                {/* Contact */}
                <div className="mt-2">
                  <span>Contact: </span>
                  <span className="text-sky-800 dark:text-sky-400">
                    <a href={`tel:${profileInfo?.contact || '+1 5752238602'}`}>
                      {profileInfo?.contact || '+1 240 685 1440'}
                    </a>
                  </span>
                </div>
              </motion.div>

              <motion.div variants={opacityVariant} className="flex items-center justify-center gap-2 mt-4">
                {/* LinkedIn */}
                <div className="w-6 h-6 mt-2 mr-2">
                  <Link
                    href={"https://www.linkedin.com/in/daveescott0509"}
                    title="LinkedIn Profile"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsLinkedin className="w-full h-full transition-all hover:scale-110 active:scale-90" />
                  </Link>
                </div>

                {/* Github */}
                <div className="w-6 h-6 mt-2 mr-2">
                  <Link href={"https://github.com/ChangeYourself0613"} title="GitHub Profile" target="_blank" rel="noopener noreferrer">
                    <BsGithub className="w-full h-full transition-all hover:scale-110 active:scale-90" />
                  </Link>
                </div>

                {/* Twitter */}
                <div className="w-6 h-6 mt-2 mr-2">
                  <Link
                    href={"https://x.com/DaveeScott59"}
                    title="Twitter Profile"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsTwitter className="w-full h-full transition-all hover:scale-110 active:scale-90" />
                  </Link>
                </div>

                {/* Facebook */}
                <div className="w-6 h-6 mt-2 mr-2">
                  <Link
                    // href={"https://www.facebook.com/profile.php?id=61561446326312&mibextid=ZbWKwL"}
                    href={"https://www.facebook.com"}
                    title="Facebook Profile"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsFacebook className="w-full h-full transition-all hover:scale-110 active:scale-90" />
                  </Link>
                </div>

              </motion.div>
            </div>

            {/* Resume Download Button */}
              <Link
                href={'https://drive.google.com/file/d/1ECsFm-j_q6U6tQ8Qt1EsqjhaI-1qQWWA/view?usp=drive_link'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2 transition-transform border border-gray-500 rounded-md outline-none select-none dark:border-gray-400 hover:bg-white dark:hover:bg-neutral-800 active:scale-95"
              >
                <FiDownload />
                <p>Resume</p>
              </Link>
          </div>
        </motion.section>

        <div>
          {/* Experiences */}
          <HomeHeading title="Work Experiences" />
          {experiencesLoading ? (
            <Loader />
          ) : Experience.length > 0 ? (
            <ExperienceSection experiences={Experience} showHomeHeading={false} />
          ) : (
            <NoData />
          )}

          {/* Blogs */}
          <HomeHeading title="Blogs" />
          {blogsLoading ? (
            <Loader />
          ) : BlogsData.length > 0 ? (
            <BlogsSection blogs={BlogsData} showHomeHeading={false} />
          ) : (
            <NoData />
          )}

          {/* Contact Section */}
          <Contact />
        </div>
      </div>
    </>
  )
}

export function HomeHeading({ title }: { title: React.ReactNode | string }) {
  return (
    <AnimatedHeading
      className="w-full my-2 px-4 text-3xl font-bold text-left font-inter flex justify-center items-center"
      variants={headingFromLeft}
    >
      {title}
    </AnimatedHeading>
  )
}

export async function getStaticProps() {
  await getRSS()
  await generateSitemap()

  return {
    props: {},
  }
}
