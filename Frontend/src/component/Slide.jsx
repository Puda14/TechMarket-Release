import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from "react-router-dom";
function Slide() {
    const slider = [
        "https://lh3.googleusercontent.com/J_zSjtEWgHK-szAODWL4NMjaxe73n3R5P6_3hp1ap_9TpBmYFc0V_VOEPlrAr73AC1CL1RmcLoluQckfpwHz2-CntplgVszS=w1920-rw",
        "https://lh3.googleusercontent.com/vFkVnaFTUmnD2qQXriIo5T-Erb5L1ZG9sYAoMjy2eQf9BgvL54LFa-uJtTa_rQpROgOHR3uUa3ZzREgB1MncDC9cNlq8WgM=w1920-rw",
        "https://lh3.googleusercontent.com/fOQ9Z1immfbRGNK4OkC2-vEr2K0a5D30WxtVvaFCgfFdrSITuH5B95ho3kYuA2kFGVz50PYlcjjYHkjbXS0MpT7pjam9s8uE=w1920-rw",
        "https://lh3.googleusercontent.com/ydH0B2Q35v_F-DYq5O9pmf_6k-CGSpRhab4F_3Gizw7TMIu7hZb3KQkJSAjOSwCSHTTfgYB_q4mX4ggoFsjkRrAYzD5r4Bnv0Q=w1920-rw",
        "https://lh3.googleusercontent.com/to4ainaxWjpq29jn03X7kV-vCDxBk5ViUEDzgePtPdsTM6mER4G_FV6LaHgj1odP-h30Fz1SwO9VVi_djTT9UqEBUH-gE5Vz=w1920-rw",
        "https://lh3.googleusercontent.com/8U9c83Pnf9Gu8iRIGo8iZ6YS2OFlMHZXjhQ2gjE57tpNViF6cfT02WyUkq07Dsx55glZdwQTJ1Naf_sPJIUv4olKBjeBBVtq=w1920-rw",
        "https://lh3.googleusercontent.com/a9MBzqCB0Ik2H70ElQf7Virgw9rf0prOim8MTQpZlvPIOVVEM-znj5j-9k35-alOARlN7WaQ2RSBPg9NGqdqSTFoRzAlT304-g=w1920-rw",
        "https://lh3.googleusercontent.com/dJY34lUC90xHTwKnkxyyK1udT45VWy1GGdrc_KbBJMq21yQFMAyDRuVUEczXiSneHnNYEzyTClFFW0O_uVjhGGlL-6i3yplF-w=w1920-rw"
    ]

    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 4000,
        cssEase: "linear"
    };
    return (
        <div className={'slider-container'}>
            <Slider {...settings} className={''}>
                {
                    slider.map((e,i)=>(
                        <Link to={'/'} key={i} className={''}>
                            <img src={e} alt="" className={''}/>
                        </Link>
                    ))
                }
            </Slider>
        </div>
    );
}

export default Slide;