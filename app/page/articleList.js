import React from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../action/articleList';
import Table from "../components/Table";

class ArticleList extends React.Component {
    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(actions.getArticleList());
    }

    static propTypes = {
        isFetching: PropTypes.bool.isRequired,
        header: PropTypes.arrayOf(PropTypes.shape({title: PropTypes.string, field: PropTypes.string})),
        articles: PropTypes.arrayOf(PropTypes.object)
    };


    render() {
        if (this.props.isFetching) {
            return (
                <h1>Loading...</h1>
            )
        }
        return (
            <Table id='articleId'
                   data={this.props.articles}
                   header={this.props.header}
                   orderBy='articleId'
                   title='文章列表'
                   clickCallback={v => {
                       alert(v);
                       console.log(v)
                   }}
            >
            </Table>
        )
    }
}

const mapStateToProps = (state, ownProps) => (
    {
        isFetching: state.articleList.isFetching,
        articles: state.articleList.data.articles,
        header: state.articleList.data.header
    }
);

export default connect(mapStateToProps)(ArticleList);