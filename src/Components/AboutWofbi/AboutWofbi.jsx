import React from 'react';
import { Image } from "cloudinary-react";

const AboutWofbi = () => {
  return (
    <section className="flex flex-col items-center justify-center mt-[100px] px-6 lg:px-20">
      {/* Quote Section */}
      <div className="text-center max-w-2xl">
        <p className="text-lg italic font-semibold">
          "And when Abram heard that his brother was taken captive, he armed his trained
          servants born in his own house, three hundred and eighteen, and pursued them into Dan"
          <br />
          <span className="block mt-2 font-bold">- Genesis 14:14</span>
        </p>
      </div>

      {/* About Section */}
      <div className="flex flex-col lg:flex-row gap-10 mt-10 max-w-5xl w-full">
        {/* Text Content */}
        <div className="textContent w-full lg:w-1/2 text-justify text-[16px] leading-relaxed">
          <p>
            The Word of Faith Bible Institute (WOFBI) is the Leadership and Training arm of the Living Faith Church Worldwide.
            Established on the 1st of September, 1986 in Kaduna, Nigeria, over 50,000 students have graduated from the numerous
            WOFBI Campuses all across Nigeria and the World.
          </p>
          <br />
          <p>
            The anchor scripture given to Bishop David Oyedepo at the onset of the institute is from Genesis 14:14:
          </p>
          <br />
          <p>
            Simply put, the Vision of WOFBI is to train men and women for exploits. Hence, the institute is a spiritual training
            school where kingdom soldiers are trained and made. Among the graduates of WOFBI are men and women in Ministry, 
            the Armed Forces, Managers and Directors of organizations, Career men and women, Business professionals, and 
            Skilled & Unskilled Workers.
          </p>
          <br />
          <p>WOFBI Courses are offered in the following certificate programs:</p>
          <ul className="list-disc list-inside mt-3">
            <li>Basic Certificate Course (BCC)</li>
            <li>Leadership Certificate Course (LCC)</li>
            <li>Leadership Diploma Course (LDC)</li>
          </ul>
          <br />
          <p>
            Each of these programs includes twelve individual courses covering various aspects of spiritual and leadership training.
          </p>
          <br />
          <p>
            In fulfillment of the prophecy that led to its establishment, many present-day ministries have been founded by WOFBI graduates.
          </p>
        </div>

        {/* Image Section */}
        <div className="imageContent w-full lg:w-1/2 flex justify-center">
          <Image
            className="rounded-lg shadow-lg w-full max-w-[400px]"
            cloudName="dqtyrjpeh"
            publicId="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1741461637/wofbiabout_qavla7.jpg"
            alt="About WOFBI"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutWofbi;
