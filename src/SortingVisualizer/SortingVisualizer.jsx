import React from "react";
import './SortingVisualizer.css';
import {getMergeSortAnimations} from '../SortingAlgorithms/SortingAlgorithm.js';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
    this.maxInt = 500;
    this.barWidth = 1080/this.maxInt*2;
  }
  componentDidMount(){
      this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.maxInt; i++) {
      array.push(between(5, 1000));
    }
    this.setState({ array });
  }
  
mergeAlgo(unsorted){
  console.log(unsorted);
  this.setState ({
    array: mergeSort(unsorted)
  });
  
}
mergeSort2() {
  const animations = getMergeSortAnimations(this.state.array);
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.getElementsByClassName('array-bar');
    const isColorChange = i % 3 !== 2;
    if (isColorChange) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      }, i * ANIMATION_SPEED_MS);
    } else {
      setTimeout(() => {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.height = `${newHeight}px`;
      }, i * ANIMATION_SPEED_MS);
    }
  }
}
  
  testSort(){

  }

  render() {
    const { array } = this.state;

    return (
        <div className="wrapper">
        {array.map((value, idx) => (
          <div 
          style={{height:value,width:1080/this.barWidth + '%'}} 
          className="array-bar" 
          key={idx}>    
          </div>
        ))}
        <div className="footer">
       <button onClick={() => this.resetArray()}>shuffle</button>
       <button onClick={() => this.mergeAlgo(this.state.array)}>MergeSort</button>
       <button onClick={() => this.mergeSort2()}>MergeSort2</button>
       <button onClick={() => this.testSort()}>TestSort</button>
       </div>
        </div>
    );
  }
}

function between(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function mergeSort(unsortedArray = []){
  //console.log(unsortedArray);

  if (unsortedArray.length <= 1){
    return unsortedArray;
  }

    const middle = Math.floor(unsortedArray.length / 2);

    const left = unsortedArray.slice(0,middle);
    const right = unsortedArray.slice(middle);

    return merge(mergeSort(left),mergeSort(right));
  }
// Merge the two arrays: left and right
function merge (left, right,auxiliaryArray,animations) {
  let resultArray = [], leftIndex = 0, rightIndex = 0;

  // We will concatenate values into the resultArray in order
  while (leftIndex < left.length && rightIndex < right.length) {
    //const animation = {};
    //animation.comparison = [leftIndex,rightIndex];
    if (left[leftIndex] < right[rightIndex]) {
      //animation.swap = [leftIndex,leftIndex];
      resultArray.push(left[leftIndex]);
      leftIndex++; // move left array cursor
    } else {
      //animation.swap = [leftIndex,leftIndex];
      resultArray.push(right[rightIndex]);
      rightIndex++; // move right array cursor
    }
    //animations.push(animation); 
  }

  // We need to concat here because there will be one element remaining
  // from either left OR the right
  return resultArray
          .concat(left.slice(leftIndex))
          .concat(right.slice(rightIndex));
}
