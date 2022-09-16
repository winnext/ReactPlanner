export function EmptyPlan(key: string) {
  return {
    unit: 'cm',
    layers: {
      'layer-1': {
        id: 'layer-1',
        key: key,
        altitude: 0,
        order: 0,
        opacity: 1,
        name: 'default',
        color: '',
        visible: true,
        vertices: {},
        lines: {},
        holes: {},
        areas: {},
        items: {},
        selected: {
          vertices: [],
          lines: [],
          holes: [],
          areas: [],
          items: [],
        },
      },
    },
    grids: {
      h1: {
        id: 'h1',
        type: 'horizontal-streak',
        properties: {
          step: 20,
          colors: ['#808080', '#ddd', '#ddd', '#ddd', '#ddd'],
        },
      },
      v1: {
        id: 'v1',
        type: 'vertical-streak',
        properties: {
          step: 20,
          colors: ['#808080', '#ddd', '#ddd', '#ddd', '#ddd'],
        },
      },
    },
    selectedLayer: 'layer-1',
    groups: {},
    width: 3000,
    height: 2000,
    meta: {},
    guides: {
      horizontal: {},
      vertical: {},
      circular: {},
    },
  };
}