import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import FolderIcon from '@material-ui/icons/Folder';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import withStyles from '@material-ui/core/styles/withStyles';
import Collapse from '@material-ui/core/Collapse/Collapse';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

export class Tree extends React.Component {

  static propTypes = {
    /**
     * title: 必选,
     * child: 子节点
     */
    data: PropTypes.array.isRequired,
    classes: PropTypes.object,
    onSelect: PropTypes.func,
  };

  render () {
    const {data, onSelect} = this.props;
    return (
      <List style={{marginRight: '20px'}}>
        {data.map((v, i) => (
          <TreeNode onSelect={onSelect} key={`${v.title}_${i}`} data={v}/>
        ))}
      </List>
    );
  }
}

class TreeNodeInner extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    classes: PropTypes.object,
    onSelect: PropTypes.func,
    hidden: PropTypes.bool,
  };

  constructor (props) {
    super(props);
    this.state = {
      hidden: props.hidden,
    };
  }

  static defaultProps = {
    hidden: true,
  };

  /**
   * {
   *   title:'***',
   *   child: [{}],
   * }
   */
  render () {
    const {data, classes, onSelect} = this.props;
    const {hidden} = this.state;

    return (
      <div className={classes.node}>
        <ListItem
          onClick={() => {
            onSelect(data);
          }}
          button={onSelect !== undefined} dense={true}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              this.setState({hidden: !hidden});
            }}
          >
            {data.child !== undefined &&
            (hidden ?
                <ListItemIcon>
                  <KeyboardArrowDown/>
                </ListItemIcon>
                :
                <ListItemIcon>
                  <KeyboardArrowRight/>
                </ListItemIcon>
            )
            }
          </div>
          {data.child === undefined && (
            <ListItemIcon>
              <FolderIcon/>
            </ListItemIcon>)
          }
          <ListItemText className={classes.list_item_text}
                        primary={data.title}
          />
        </ListItem>
        {data.child &&
        <Collapse in={hidden}>
          <List>
            {data.child !== undefined && (
              data.child.map(v => (
                  <TreeNode onSelect={onSelect} hidden={true} key={v.title} data={v}/>
                )
              )
            )}
          </List>
        </Collapse>
        }
      </div>
    );
  }
}

const nodeStyles = () => ({
      node: {
        paddingLeft: '20px',
      },
      list_item_text: {
        padding: '0px',
      },
    }
  )
;

export const TreeNode = withStyles(nodeStyles)(TreeNodeInner);