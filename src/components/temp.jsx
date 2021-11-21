import React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import './drag.css'
import removeEffect from '../assets/sounds/removeItem.mp3'
import useSound from 'use-sound';
import dropSound from '../assets/sounds/drop.wav'
import { useEffect } from 'react';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';




const URLImage = ({ image, handleClick }) => {
    const [img] = useImage(image.src);
    return (
        <Image
            image={img}
            x={image.x}
            y={image.y}
            width={90}
            height={70}
            // I will use offset to set origin to the center of the image
            offsetX={img ? 90 / 2 : 0}
            offsetY={img ? 70 / 2 : 0}
            onClick={handleClick}
            onTouchStart={handleClick}
        />
    );
};

const TempDDrop = (props) => {
    var currentImage = null
    const stageRef = React.useRef();
    const [images, setImages] = React.useState([]);
    const [playRemoveEffect] = useSound(removeEffect)
    const [hover, setHover] = React.useState(false)
    const [stageWidth, setStageWidth] = React.useState(300)
    const [stageHeight, setStageHeight] = React.useState(200)

    const container = React.useRef();

    const toggleHover = (value) => {
        setHover(value)
    }
    var animate;
    if (hover) {
        animate = "animate__animated animate__heartBeat"
    }
    else {
        animate = ""
    }
    const checkSize = () => {
        const width = container.current.offsetWidth;
        const height = container.current.offsetHeight;

        setStageWidth(width)
        setStageHeight(height)
    };
    useEffect(() => {
        checkSize();
        window.addEventListener("resize", checkSize);

        return () => {
            window.removeEventListener("resize", checkSize)
        }
    }, [])

    return (
        <div className="noselect parentDiv" >

            <div className="dropBox"
                ref={container}
            >
                <DropTarget targetKey="me"
                    onHit={() => {
                        setImages(
                            images.concat([
                                {
                                    x: Math.random() * (stageWidth - 90) + 50,
                                    y: Math.random() * (stageHeight - 70) + 30,
                                    src: currentImage,
                                },
                            ])
                        );
                        // playSoundEffect(props.count)
                        props.incCount(1)
                    }}
                >

                    <Stage
                        width={stageWidth}
                        height={stageHeight}
                        ref={stageRef}
                    >

                        <Layer>

                            {images.map((image) => {
                                return <URLImage image={image} handleClick={() => {
                                    
                                    setImages(
                                        images.filter(item => item !== image)
                                    )
                                    playRemoveEffect()
                                    props.decCount(1)
                                }} />;
                            })}
                        </Layer>
                    </Stage>

                </DropTarget>
            </div>
            <DragDropContainer targetKey="me"
                onDragStart={() => console.log("rooster 1 clicked") }
            >

                <img
                    alt="lion"
                    src={props.img}
                    className={"noselect draggableImage "}
                 
                />

            </DragDropContainer>
            <DragDropContainer targetKey="me"
               onDragStart={() => currentImage  = null }
            >

                <img
                    alt="lion"
                    src={props.img}
                    className={"noselect draggableImage "}
                   
                />

            </DragDropContainer>
            <br />
            <br />

        </div>
    );
};

export default TempDDrop;



// <br />
// <div
//     onDrop={(e) => {
//         e.preventDefault();
//         // register event position
//         stageRef.current.setPointersPositions(e);
//         // add image
//         dropS.play()
//         setImages(
//             images.concat([
//                 {
//                     ...stageRef.current.getPointerPosition(),
//                     src: dragUrl.current,
//                 },
//             ])
//         );
//         props.incCount(1)
//         playSoundEffect(props.count)
//         //setCount(count + 1)
//     }}
//     ref={container}
//     onDragOver={(e) => e.preventDefault()}
//     className="dropBox"
// >
//     <Stage
//         width={stageWidth}
//         height={stageHeight}
//         ref={stageRef}
//     >
//         <Layer>
//             {images.map((image) => {
//                 return <URLImage image={image} handleClick={() => {
//                     setImages(
//                         images.filter(item => item !== image)
//                     )
//                     playRemoveEffect()
//                     props.decCount(1)
//                 }} dropImage={draggableImage} />;
//             })}
//         </Layer>
//     </Stage>

// </div>
// <div >
//     <img
//         alt="lion"

//         src={props.img}
//         draggable={props.count < 10 ? "true" : "false"}
//         onDragStart={(e) => {
//             dragUrl.current = e.target.src;
//         }}

//         className={"noselect draggableImage " + animate}
//         onMouseEnter={() => { toggleHover(true) }}
//         onMouseLeave={() => { toggleHover(false) }}
//         ref={draggableImage}
//     // ref={dragThis}
//     />
// </div>
// <br />
// <br />
// {/* <div>
//     <h1>{props.count}</h1>
// </div> */}