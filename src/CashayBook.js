import React, {Component} from 'react';
import RecentPosts from './RecentPosts';
import {cashay} from './index';
import {connect} from 'react-redux';

const queryPostCount = `
  query {
    postCount: getPostCount
  }`;

const mutationHandlers = {
  createPost(optimisticVariables, docFromServer, currentResponse, state, invalidate) {
    if (optimisticVariables) {
      return currentResponse.postCount++;
    }
    return docFromServer.createPost.postCount;
  }
};

const mapStateToProps = () => ({cashay: cashay.query(queryPostCount, {mutationHandlers})});

@connect(mapStateToProps)
export default class CashayBook extends Component {
  render() {
    const {postCount} = this.props.cashay.data;
    const {isComplete} = this.props.cashay;
    return (
      <div className="postContainer">
        <div className="recentPosts">
          <h1>Welcome to the Cashay book!</h1>
          <h3>{isComplete ? `We currently have ${postCount} posts!` : "LOADING AHH I CANT WAIT IM SO EXCITED"}</h3>
          <RecentPosts/>
        </div>
      </div>
    );
  }
}
