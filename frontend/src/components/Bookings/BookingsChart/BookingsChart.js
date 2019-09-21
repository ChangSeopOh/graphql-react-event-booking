import React from 'react';
import {Bar as BarChart} from 'react-chartjs';


//Price Standard
const BOOKINGS_BUCKETS = {
    Cheap :{
        min:0,
        max:50
    },
    Normal : {
        min:50,
        max:1000
    },
    Expensive : {
        min:1000,
        max:Number.MAX_VALUE
    }
};

const bookingsChart = props => {
    const charData={labels:[],datasets:[]};
    let values = [];
    for(const bucket in BOOKINGS_BUCKETS){
        const filteredBookingsCount = props.bookings.reduce((prev, current) =>{
            if(current.event.price > BOOKINGS_BUCKETS[bucket].min &&
               current.event.price < BOOKINGS_BUCKETS[bucket].max){
                return prev + 1
            }else{
                return prev;
            }
        },0);
        values.push(filteredBookingsCount);
        charData.labels.push(bucket);
        charData.datasets.push({ 
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data:values
        });
        
        values = [...values];
        values[values.length-1] = 0;
        
    }//end for statement
 
    return <div stype={{textAlign:'center'}}><BarChart data={charData}/></div>;
};

export default bookingsChart;