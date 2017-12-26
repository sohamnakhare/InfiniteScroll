import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InfiniteScroll extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
      .isRequired,
    loader: PropTypes.object,
    loadMore: PropTypes.func.isRequired,
    ref: PropTypes.func,
    threshold: PropTypes.number,
    useCapture: PropTypes.bool,
    useWindow: PropTypes.bool,
  };

  static defaultProps = {
    ref: null,
    threshold: 5,
    useWindow: false,
    useCapture: false,
    loader: null,
  };

  constructor(props) {
    super(props);

    this.scrollListener = this.scrollListener.bind(this);
  }

  componentDidMount() {
    this.attachScrollListener();
  }

  componentDidUpdate() {
    this.attachScrollListener();
  }

  componentWillUnmount() {
    this.detachScrollListener();
  }

  detachScrollListener() {
    let scrollEl = window;
    if (this.props.useWindow === false) {
      scrollEl = this.scrollComponent.parentNode;
    }

    scrollEl.removeEventListener(
      'scroll',
      this.scrollListener,
      this.props.useCapture,
    );
   
  }

  attachScrollListener() {

    let scrollEl = window;
    if (this.props.useWindow === false) {
      scrollEl = this.scrollComponent.parentNode;
    }
   
    scrollEl.addEventListener(
      'scroll',
      this.scrollListener,
      this.props.useCapture,
    );
    
  }

  scrollListener() {
    const el = this.scrollComponent;
    const scrollEl = window;

    let offset;
    if (this.props.useWindow) {
      const doc =
        document.documentElement || document.body.parentNode || document.body;
      const scrollTop =
        scrollEl.pageYOffset !== undefined
          ? scrollEl.pageYOffset
          : doc.scrollTop;
        offset =
          this.calculateTopPosition(el) +
          (el.offsetHeight - scrollTop - window.innerHeight);
    } else {
      offset =
        el.scrollHeight - el.parentNode.scrollTop - el.parentNode.clientHeight;
    }
    if (offset < Number(this.props.threshold)) {
      this.detachScrollListener();
      if (typeof this.props.loadMore === 'function') {
        this.props.loadMore();
      }
    }
  }

  calculateTopPosition(el) {
    if (!el) {
      return 0;
    }
    return el.offsetTop + this.calculateTopPosition(el.offsetParent);
  }

  render() {
    const {
      children,
      loadMore,
      ref,
      threshold,
      useCapture,
      useWindow,
      ...props
    } = this.props;

    props.ref = node => {
      this.scrollComponent = node;
      if (ref) {
        ref(node);
      }
    };

    const childrenArray = [children];
    return React.createElement('div', props, ...childrenArray);
  }
}