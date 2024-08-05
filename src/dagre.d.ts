declare module 'dagre' {
    export namespace graphlib {
      class Graph {
        constructor();
        setDefaultEdgeLabel(callback: () => any): void;
        setGraph(options: any): void;
        setNode(nodeId: string, options: any): void;
        setEdge(sourceId: string, targetId: string): void;
        node(nodeId: string): { x: number; y: number };
      }
    }
    export function layout(graph: graphlib.Graph): void;
  }
  