import React from 'react';
import homecss from "./homecss/home.module.css";

function Home() {
  return (
    <div className={homecss.container}>
      {/* Section 1: Header with dog image */}
      <div className={homecss.section1}>
        <img
          src="https://img5.pic.in.th/file/secure-sv1/cd7c1b1b516679ae3bd95f093ad15bd1.png"
          alt="dog with glasses"
          className={homecss.image1}
        />
        <div className={homecss.section1_1}>
          <h2>ที่ฝากสัตว์เลี้ยงที่คุณไว้วางใจได้ <br />เหมือนอยู่บ้านหลังที่สอง</h2>
          <p>ยินดีต้อนรับสู่ Animo! ที่ที่คุณสามารถฝากสัตว์เลี้ยงที่คุณรักได้อย่างสบายใจ<br />
          ให้พวกเขาได้พักผ่อนและสนุกสนานในสถานที่ที่ปลอดภัยและมีความอบอุ่น<br />
          เหมือนอยู่บ้านของตัวเอง ไม่ว่าคุณจะต้องการเดินทางเพื่อทำงานหรือพักผ่อน<br />
          เรามีผู้รับฝากสัตว์เลี้ยงที่เชี่ยวชาญและใส่ใจในการดูแลสัตว์เลี้ยงของคุณตลอด
          <br />เวลา</p>
        </div>
      </div>
      <hr className={homecss.customHr} />
      {/* Section 2: Cat Image and Text */}
      <div className={homecss.section2}>
        <div className={homecss.section2_1}>
          <h2>เพราะเรารู้ว่าสัตว์เลี้ยงของคุณสำคัญแค่ไหน</h2>
          <p>ที่ Animo เราเข้าใจดีว่าสัตว์เลี้ยงของคุณเป็นส่วนหนึ่งของครอบครัว<br />
          นั่นเป็นเหตุผลที่เรามุ่งมั่นในการให้บริการที่ดีที่สุดเพื่อให้คุณมั่นใจได้ว่าสัตว์เลี้ยง<br />
          ของคุณจะได้รับการดูแลอย่างดีในช่วงเวลาที่คุณไม่สามารถดูแลพวกเขาได้<br />
          เรามีทีมงานที่รักสัตว์และมีประสบการณ์ในการดูแลสัตว์เลี้ยงทุกประเภท<br />
          พร้อมให้คำปรึกษาและดูแลพวกเขาอย่างใส่ใจ</p>
        </div>
        <img
          src="https://img2.pic.in.th/pic/b8f96e64ecc7af6005df98937abab5c5.png"
          alt="cat"
          className={homecss.image2}
        />
      </div>
      {/* Section 3: Dog Image and Text */}
      <div className={homecss.section1}>
        <img
          src="https://img2.pic.in.th/pic/99a66409982a5fadb1e68bf02eed9dd0.png"
          alt="dog wrapped in blanket"
          className={homecss.image3}
        />
        <div className={homecss.section3_1}>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ที่ Animo เราสร้างแพลตฟอร์มที่รวมรวบสถานที่รับฝากสัตว์เลี้ยงที่มีคุณภาพสูง<br />
          เพื่อให้คุณสามารถเลือกสถานที่ที่ดีที่สุดสำหรับสัตว์เลี้ยงของคุณได้อย่างง่ายดาย<br />
          ไม่ว่าคุณจะต้องการฝากสัตว์เลี้ยงในช่วงเวลาสั้นหรือยาว เราพร้อมให้บริการคุณเสมอ<br />
          มาร่วมเป็นส่วนหนึ่งของครอบครัว Animo และให้เราช่วยดูแลสัตว์เลี้ยงที่คุณรัก</p>
        </div>
      </div>

      {/*พื้นสีขาว*/}
      <div className={homecss.divider}></div>

      {/* Section 4: Services */}
      <div className={homecss.servicesSection}>
        <div className={homecss.servicesSection2}>
        <h2>บริการของเรา</h2>
        </div>
        <div className={homecss.servicesGrid}>
          <div className={homecss.serviceItem}>
          <img
          src="https://img5.pic.in.th/file/secure-sv1/19ab94f4affd4b192.png"
          className={homecss.image4}
        />
            <p>การรับฝากสัตว์เลี้ยง<br />ระยะสั้นและระยะยาว</p>
          </div>
          <div className={homecss.serviceItem}>
          <img
          src="https://img2.pic.in.th/pic/23568071a53c6e2a5.png"
          className={homecss.image4}
        />
            <p>การดูแลสัตว์เลี้ยง<br />โดยผู้เชี่ยวชาญ</p>
          </div>
          <div className={homecss.serviceItem}>
          <img
          src="https://img5.pic.in.th/file/secure-sv1/31f5f804fbeb4106d.png"
          className={homecss.image4}
        />
            <p>บริการด้านสุขภาพ<br />และการดูแลพิเศษ</p>
          </div>
          <div className={homecss.serviceItem}>
          <img
          src="https://img5.pic.in.th/file/secure-sv1/47ace7e0731654f51.png"
          className={homecss.image5}
        />
            <p>การจองและจัดการ<br />ออนไลน์</p>
          </div>
          <div className={homecss.serviceItem}>
          <img
          src="https://img2.pic.in.th/pic/pet-certificate-svgrepo-com-1.png"
          className={homecss.image6}
        />
            <p>การอัพเดทสถานะ<br />สัตว์เลี้ยง</p>
          </div>
          <div className={homecss.serviceItem}>
          <img
          src="https://img5.pic.in.th/file/secure-sv1/6723e511194188e6a.png"
          className={homecss.image7}
        />
            <p>บริการให้คำปรึกษา<br />&nbsp;</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
