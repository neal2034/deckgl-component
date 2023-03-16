import React from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Switch,
} from '@mui/material';
import { MAP_LAYER_DATA } from '../../assets/constant';
import { TextLayer } from '@deck.gl/layers/typed';
import './controlPannel.css';

interface IControlPanelProps {
  layers: TextLayer[];
  handleToggle: (index: number) => void;
  addLayer: VoidFunction;
}

const ControlPanel = (props: IControlPanelProps): JSX.Element => {
  const { layers, handleToggle, addLayer } = props;
  return (
    <div className="panel">
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
        subheader={
          <ListSubheader
            sx={{ fontSize: '16px', fontWeight: 'bold', color: '#666666' }}
          >
            Control Panel
          </ListSubheader>
        }
      >
        {layers.map((item, index) => {
          return (
            <ListItem key={item.id}>
              <ListItemText
                id={item.id}
                primary={item.id}
                sx={{ color: '#666' }}
              />
              <Switch
                edge="end"
                checked={item.props.visible}
                onChange={() => handleToggle(index)}
                inputProps={{
                  'aria-labelledby': 'switch-list-label-wifi',
                }}
              />
            </ListItem>
          );
        })}
        {layers.length < MAP_LAYER_DATA.length && (
          <ListItem>
            <Button variant={'contained'} onClick={addLayer}>
              Add Layer
            </Button>
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default ControlPanel;
