import PropTypes from "prop-types";

let _Author;
_Author = PropTypes.shape({
  type: PropTypes.string,
  id: PropTypes.string,
  host: PropTypes.string,
  displayName: PropTypes.string,
  url: PropTypes.string,
  github: PropTypes.string,
});

let _Post;
_Post = PropTypes.shape({
  type: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
  author: _Author,
  source: PropTypes.string,
  origin: PropTypes.string,
  description: PropTypes.string,
  contentType: PropTypes.string,
  content: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string),
  count: PropTypes.number,
  size: PropTypes.number,
  comments: PropTypes.string,
  published: PropTypes.string,
  visibility: PropTypes.string,
  unlisted: PropTypes.bool,
});

export const Author = _Author;
export const Post = _Post;
