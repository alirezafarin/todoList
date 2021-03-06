import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';

import CalendarItem from './CalendarItem';
import { fetchDate, selectDay } from '../actions';

class Calendar extends React.Component {

  componentDidMount() {
    this.props.fetchDate();

    window.addEventListener('scroll', function() {

      let node = $('.calender-bottom')[0];
      let coords = node.getBoundingClientRect();
      if ( coords.top <= 0 ) {
        $("#calender").addClass("sticky-top");
        $('.calender-top').addClass('gone');
      } 

      if( coords.top > 0 ) {
        $("#calender").removeClass("sticky-top");
        $('.calender-top').removeClass('gone');
      }

    });

  }

  selectDay = (e) => {
    if( $(e.target).hasClass("day") ) {
      $(".selected-day").removeClass("selected-day");
      $(e.target).addClass("selected-day");
      let sDay = $(e.target).text();
      this.props.selectDay(sDay);
    }
  }

  renderCalenderItem = () => {
    if( this.props.date.year ) {
      let weekDays = [ "جمعه", "پنج", "چهار", "سه", "دو", "یک", "شنبه" ];
      return [1, 2, 3, 4, 5, 6, 7].map((i) => {
        let day = this.props.date.day - ( this.props.date.dWeek - i );
        return(
          <CalendarItem
            key={day}
            weekDay={weekDays[7-i]}
            monthDay={day}
            today={this.props.date.day === day}
            sDay={this.props.date.sDay == day}
          />
        );
      });
    }
  }

  render() {
    return(
      <section id="calender">
        <div className="calender-top d-flex align-items-center justify-content-around text-light">
          <div className="top-date">
            <div className="top-week text-center">
              {this.props.date.week}
            </div>
            <div className="top-month">
              {this.props.date.year} {this.props.date.month}
            </div>
          </div>
          <div className="top-day">
            {this.props.date.day}
          </div>
        </div> 
        <div className="calender-bottom d-flex justify-content-between text-light" onClick={(e) => this.selectDay(e)}>
          {this.renderCalenderItem()}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { date: state.date };
}

export default connect( mapStateToProps, {
  fetchDate,
  selectDay
} )(Calendar);