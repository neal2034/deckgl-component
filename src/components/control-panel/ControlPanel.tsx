import React, { ChangeEvent } from 'react';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Switch,
} from '@mui/material';
import './controlPannel.css';
import { Layer } from '@deck.gl/core/typed';

interface IControlPanelProps {
  layers: Layer[];
  handleToggle: (index: number) => void;
  addLayer: (geojsonFile: File) => void;
}

const ControlPanel = (props: IControlPanelProps): JSX.Element => {
  const { layers, handleToggle, addLayer } = props;

  const onFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addLayer(event.target.files[0]);
      event.target.value = '';
    }
  };

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
            <ListItem key={index}>
              <ListItemText
                id={item.id}
                primary={'Layer-' + (index + 1)}
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

        <ListItem>
          <Button variant={'contained'} component={'label'}>
            <input
              hidden
              accept=".geojson"
              type="file"
              onChange={onFileUpload}
            />
            Add Layer
          </Button>
        </ListItem>
      </List>
    </div>
  );
};

export default ControlPanel;
