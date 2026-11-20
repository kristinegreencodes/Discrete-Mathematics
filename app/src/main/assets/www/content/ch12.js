chapter({ id: 'ch12', title: 'Graphs & Trees', icon: '🕸️', c1: '#C92A2A', c2: '#FF8787', desc: 'Terminology, special graphs, Euler & Hamilton paths, shortest paths, trees and traversals' }, [

  L('12-1', 'Graph basics', [
    card('Vertices and edges', `<p>A <b>graph</b> G = (V, E) has a set of <b>vertices</b> (nodes) V and <b>edges</b> E connecting pairs of vertices.</p>
      <ul><li><b>Simple graph</b>: no loops, no multiple edges.</li><li><b>Multigraph</b>: multiple edges allowed.</li><li><b>Directed graph</b> (digraph): edges have arrows.</li></ul>
      <p>Two vertices joined by an edge are <b>adjacent</b> (neighbors).</p>`,
      { viz: { type: 'graph', nodes: ['a', 'b', 'c', 'd', 'e'], edges: [['a', 'b'], ['a', 'c'], ['b', 'c'], ['c', 'd'], ['d', 'e']] } }),
    card('Degree & the Handshake Theorem', `<p>The <b>degree</b> deg(v) is the number of edges touching v (a loop counts twice).</p>
      ${F('Σ deg(v) = 2|E|', 'Handshake Theorem')}
      <p>Consequence: every graph has an <span class="hl">even number of odd-degree vertices</span>.</p>
      ${EX('In the graph above: deg(a)=2, deg(b)=2, deg(c)=3, deg(d)=2, deg(e)=1. Sum = 10 = 2·5 edges ✓')}`),
    card('Directed degrees', `<p>In a digraph, <b>in-degree</b> counts arrows coming in and <b>out-degree</b> counts arrows going out.</p>${F('Σ in-deg = Σ out-deg = |E|')}`),
    int('In the graph shown, what is deg(c)?', 3, 'c is joined to a, b and d.', { viz: { type: 'graph', nodes: ['a', 'b', 'c', 'd', 'e'], edges: [['a', 'b'], ['a', 'c'], ['b', 'c'], ['c', 'd'], ['d', 'e']] } }),
    int('A graph has degrees 3, 3, 2, 2, 2. How many edges does it have?', 6, 'Sum = 12 = 2|E|, so |E| = 6.'),
    int('A simple graph has 10 vertices, each of degree 4. How many edges?', 20, '10 · 4 / 2 = 20.'),
    tf('A graph can have exactly 3 vertices of odd degree.', false, 'The number of odd-degree vertices is always even.'),
    mc('Which degree sequence is impossible for a graph?', ['3, 3, 3, 2, 2', '2, 2, 2, 2', '3, 3, 2, 2', '1, 1, 0'], 0, 'Sum = 13 is odd, but Σdeg = 2|E| must be even.'),
    int('A digraph has 7 edges. What is the sum of all out-degrees?', 7, 'Every edge contributes 1 out-degree.')
  ]),

  L('12-2', 'Special graphs', [
    card('Complete graphs, cycles, wheels', `${TBL(['Graph', 'Description', 'Edges'], [['Kₙ', 'every pair of n vertices is joined', 'n(n − 1)/2'], ['Cₙ', 'n vertices in a cycle (n ≥ 3)', 'n'], ['Wₙ', 'Cₙ plus a hub joined to all', '2n'], ['Qₙ', 'n-cube: bit strings of length n, joined if they differ in 1 bit', 'n·2ⁿ⁻¹']])}`,
      { viz: { type: 'graph', nodes: ['1', '2', '3', '4', '5'], edges: [['1', '2'], ['1', '3'], ['1', '4'], ['1', '5'], ['2', '3'], ['2', '4'], ['2', '5'], ['3', '4'], ['3', '5'], ['4', '5']] } }),
    card('Bipartite graphs', `<p>A graph is <b>bipartite</b> if its vertices split into two groups with every edge going <span class="hl">between</span> the groups (none inside a group).</p>
      <p><b>Kₘ,ₙ</b> (complete bipartite) joins every vertex in a group of m to every vertex in a group of n: <b>m·n</b> edges.</p>
      ${TIP('A graph is bipartite exactly when it can be colored with 2 colors so neighbors differ — i.e. it has no odd-length cycle.')}`,
      { viz: { type: 'graph', nodes: [{ id: 'a', x: 70, y: 40 }, { id: 'b', x: 160, y: 40 }, { id: 'c', x: 250, y: 40 }, { id: '1', x: 115, y: 150 }, { id: '2', x: 205, y: 150 }], edges: [['a', '1'], ['a', '2'], ['b', '1'], ['b', '2'], ['c', '1'], ['c', '2']] } }),
    card('Graph coloring', `<p>The <b>chromatic number</b> χ(G) is the fewest colors needed so adjacent vertices get different colors.</p>
      ${EX('χ(Kₙ) = n. &nbsp; χ(Cₙ) = 2 if n is even, 3 if n is odd. &nbsp; Bipartite (with an edge) → 2.')}
      <p>Uses: scheduling exams, assigning radio frequencies, register allocation.</p>`),
    int('How many edges does K₆ have?', 15, '6·5/2 = 15.'),
    int('How many edges does K₃,₄ have?', 12, '3 · 4 = 12.'),
    int('How many edges does the cycle C₈ have?', 8, 'A cycle on n vertices has n edges.'),
    int('What is the chromatic number of C₇?', 3, 'Odd cycles need 3 colors.'),
    tf('C₆ is bipartite.', true, 'Even cycles can be 2-colored.'),
    tf('K₃ is bipartite.', false, 'K₃ is a triangle — an odd cycle.'),
    int('How many vertices does the cube graph Q₃ have?', 8, 'One vertex for each bit string of length 3: 2³ = 8.')
  ]),

  L('12-3', 'Representing graphs', [
    card('Adjacency list & matrix', `<p>An <b>adjacency list</b> lists each vertex's neighbors. An <b>adjacency matrix</b> has a 1 in row i, column j when vertices i and j are adjacent.</p>
      ${TBL(['', 'a', 'b', 'c'], [['<b>a</b>', 0, 1, 1], ['<b>b</b>', 1, 0, 0], ['<b>c</b>', 1, 0, 0]])}
      <p>For an undirected graph the matrix is <b>symmetric</b>; a row's sum is that vertex's degree.</p>`,
      { viz: { type: 'graph', nodes: ['a', 'b', 'c'], edges: [['a', 'b'], ['a', 'c']] } }),
    card('Isomorphism & subgraphs', `<p>Graphs are <b>isomorphic</b> if they are the same graph with vertices renamed. Isomorphic graphs must share the number of vertices, edges and the degree sequence.</p>
      <p>A <b>subgraph</b> uses some of the vertices and edges of a graph.</p>
      ${TIP('Different degree sequences ⇒ definitely NOT isomorphic. Same degree sequences ⇒ maybe.')}`),
    mc('In an undirected graph\'s adjacency matrix, the sum of row v equals…', ['deg(v)', 'the number of vertices', 'the number of edges', '2·deg(v)'], 0, 'Each 1 in the row is one neighbor (for simple graphs).'),
    tf('The adjacency matrix of an undirected graph is symmetric.', true, 'If i is adjacent to j, then j is adjacent to i.'),
    int('An adjacency matrix for a simple undirected graph has twelve 1s total. How many edges?', 6, 'Each edge appears twice (row i col j and row j col i): 12 / 2 = 6.'),
    mc('Two graphs both have 5 vertices and 6 edges. One has degrees 3,3,2,2,2 and the other 4,2,2,2,2. Are they isomorphic?', ['No — different degree sequences', 'Yes — same counts', 'Yes — always', 'Can\'t tell'], 0, 'Isomorphism preserves degrees.')
  ]),

  L('12-4', 'Paths, Euler and Hamilton', [
    card('Paths and connectivity', `<p>A <b>path</b> is a sequence of edges from one vertex to another. A <b>circuit</b> (cycle) is a path that starts and ends at the same vertex.</p>
      <p>A graph is <b>connected</b> if there is a path between every pair of vertices.</p>`),
    card('Euler paths & circuits', `<p>An <b>Euler circuit</b> uses <span class="hl">every edge exactly once</span> and returns to the start. An <b>Euler path</b> uses every edge once but may end elsewhere.</p>
      ${TBL(['Connected graph has…', 'Result'], [['0 odd-degree vertices', 'Euler circuit'], ['exactly 2 odd-degree vertices', 'Euler path (start/end at the odd ones), no circuit'], ['more than 2 odd-degree vertices', 'neither']])}
      ${TIP('Euler = Edges. Think "drawing without lifting your pen".')}`),
    card('Hamilton paths & circuits', `<p>A <b>Hamilton circuit</b> visits <span class="hl">every vertex exactly once</span> and returns to the start. There's no simple test — it's a famously hard (NP-complete) problem.</p>
      ${EX('Kₙ (n ≥ 3) always has a Hamilton circuit. Dirac\'s theorem: if every vertex has degree ≥ n/2, there is one.')}
      ${TIP('Hamilton = "Hits every vertex". The traveling salesperson problem looks for the cheapest Hamilton circuit.')}`),
    mc('A connected graph has degrees 2, 4, 4, 2, 2. It has…', ['An Euler circuit', 'An Euler path but no circuit', 'Neither', 'Only a Hamilton circuit'], 0, 'All degrees are even.'),
    mc('A connected graph has degrees 3, 3, 2, 2. It has…', ['An Euler path but no Euler circuit', 'An Euler circuit', 'Neither', 'Can\'t tell'], 0, 'Exactly two odd vertices.'),
    mc('A connected graph has degrees 3, 3, 3, 3. It has…', ['Neither an Euler path nor circuit', 'An Euler circuit', 'An Euler path', 'Both'], 0, 'Four odd vertices is too many.'),
    mc('Does K₅ have an Euler circuit?', ['Yes — every vertex has degree 4', 'No — K₅ has odd degrees', 'Only an Euler path', 'No — K₅ is not connected'], 0, 'In Kₙ every vertex has degree n − 1 = 4, which is even.'),
    mc('Visiting every vertex exactly once and returning home is a…', ['Hamilton circuit', 'Euler circuit', 'Euler path', 'Spanning tree'], 0, 'Hamilton is about vertices; Euler is about edges.'),
    tf('There is a simple degree test that decides if any graph has a Hamilton circuit.', false, 'Unlike Euler circuits, no efficient test is known.'),
    mc('The graph shown has…', ['An Euler path but no Euler circuit', 'An Euler circuit', 'Neither', 'No edges'], 0, 'Degrees: a2, b3, c3, d2 → exactly two odd vertices (b and c).', { viz: { type: 'graph', nodes: ['a', 'b', 'c', 'd'], edges: [['a', 'b'], ['a', 'c'], ['b', 'c'], ['b', 'd'], ['c', 'd']] } })
  ]),

  L('12-5', 'Weighted graphs & shortest paths', [
    card('Weighted graphs', `<p>Each edge has a <b>weight</b> (distance, cost, latency). The <b>length</b> of a path is the sum of its weights.</p>`,
      { viz: { type: 'graph', nodes: [{ id: 'A', x: 40, y: 95 }, { id: 'B', x: 130, y: 35 }, { id: 'C', x: 130, y: 155 }, { id: 'D', x: 220, y: 95 }, { id: 'E', x: 290, y: 95 }], edges: [['A', 'B', 4], ['A', 'C', 2], ['B', 'C', 1], ['B', 'D', 5], ['C', 'D', 8], ['D', 'E', 3]] } }),
    card('Dijkstra\'s algorithm', `<ol><li>Set dist(start) = 0, all others ∞.</li><li>Pick the unvisited vertex with the smallest distance and mark it visited.</li><li>Update each neighbor: dist = min(old, dist(current) + weight).</li><li>Repeat until the destination is visited.</li></ol>
      ${EX('Above, from A: C = 2, then B = min(4, 2 + 1) = 3, then D = min(3 + 5, 2 + 8) = 8, then E = 11. Shortest A→E path: A–C–B–D–E, length <b>11</b>.')}
      ${TIP('Network routing protocols like OSPF use Dijkstra\'s algorithm.')}`),
    int('Using the graph from the lesson, what is the shortest distance from A to B?', 3, 'A→C→B = 2 + 1 = 3, shorter than the direct edge 4.', { viz: { type: 'graph', nodes: [{ id: 'A', x: 40, y: 95 }, { id: 'B', x: 130, y: 35 }, { id: 'C', x: 130, y: 155 }, { id: 'D', x: 220, y: 95 }, { id: 'E', x: 290, y: 95 }], edges: [['A', 'B', 4], ['A', 'C', 2], ['B', 'C', 1], ['B', 'D', 5], ['C', 'D', 8], ['D', 'E', 3]] } }),
    int('Same graph: shortest distance from C to E?', 9, 'C→B→D→E = 1 + 5 + 3 = 9 (C→D→E is 11).', { viz: { type: 'graph', nodes: [{ id: 'A', x: 40, y: 95 }, { id: 'B', x: 130, y: 35 }, { id: 'C', x: 130, y: 155 }, { id: 'D', x: 220, y: 95 }, { id: 'E', x: 290, y: 95 }], edges: [['A', 'B', 4], ['A', 'C', 2], ['B', 'C', 1], ['B', 'D', 5], ['C', 'D', 8], ['D', 'E', 3]] } }),
    mc('In Dijkstra\'s algorithm, which vertex is processed next?', ['The unvisited vertex with the smallest tentative distance', 'The vertex with the most edges', 'The vertex added most recently', 'A random vertex'], 0, 'That greedy choice is what makes Dijkstra correct (for non-negative weights).'),
    tf('Dijkstra\'s algorithm works correctly with negative edge weights.', false, 'It assumes all weights are non-negative.')
  ]),

  L('12-6', 'Trees', [
    card('What is a tree?', `<p>A <b>tree</b> is a <span class="hl">connected graph with no cycles</span>.</p>
      ${F('A tree with n vertices has exactly n − 1 edges.')}
      <p>Between any two vertices of a tree there is exactly <b>one</b> path.</p>`,
      { viz: { type: 'tree', t: ['r', ['a', ['c'], ['d']], ['b', ['e'], ['f'], ['g']]] } }),
    card('Rooted tree vocabulary', `<ul><li><b>Root</b>: the top vertex. <b>Parent / child</b>: one level apart.</li><li><b>Leaf</b>: no children. <b>Internal vertex</b>: has children.</li><li><b>Level</b> of a vertex = its distance from the root. <b>Height</b> = the maximum level.</li></ul>
      ${EX('Tree above: root r, internal a and b, leaves c, d, e, f, g, height 2.')}`),
    card('m-ary trees', `<p>An <b>m-ary tree</b>: every internal vertex has at most m children (binary: m = 2). A <b>full</b> m-ary tree: every internal vertex has exactly m children.</p>
      ${TBL(['Full m-ary tree with i internal vertices', 'Formula'], [['total vertices n', 'm·i + 1'], ['leaves ℓ', '(m − 1)·i + 1']])}
      ${F('An m-ary tree of height h has at most mʰ leaves.')}`),
    int('A tree has 25 vertices. How many edges?', 24, 'n − 1 = 24.'),
    int('In the tree shown, how many leaves are there?', 5, 'c, d, e, f, g.', { viz: { type: 'tree', t: ['r', ['a', ['c'], ['d']], ['b', ['e'], ['f'], ['g']]] } }),
    int('A full binary tree has 10 internal vertices. How many leaves?', 11, '(2 − 1)·10 + 1 = 11.'),
    int('A full 3-ary tree has 4 internal vertices. How many vertices in total?', 13, '3·4 + 1 = 13.'),
    int('What is the maximum number of leaves in a binary tree of height 5?', 32, '2⁵ = 32.'),
    tf('Adding any edge to a tree creates a cycle.', true, 'There\'s already a path between those two vertices; the new edge closes a cycle.'),
    tf('A connected graph with 8 vertices and 8 edges is a tree.', false, 'A tree on 8 vertices has exactly 7 edges.')
  ]),

  L('12-7', 'Traversals & spanning trees', [
    card('Tree traversals', `${TBL(['Traversal', 'Order'], [['Preorder', 'root, then left subtree, then right subtree'], ['Inorder', 'left subtree, root, right subtree'], ['Postorder', 'left subtree, right subtree, root']])}
      ${EX('For the tree below: Preorder <b>A B D E C</b>, Inorder <b>D B E A C</b>, Postorder <b>D E B C A</b>.')}
      ${TIP('Inorder on a binary search tree lists the keys in sorted order.')}`,
      { viz: { type: 'tree', t: ['A', ['B', ['D'], ['E']], ['C']] } }),
    card('Spanning trees', `<p>A <b>spanning tree</b> of a connected graph is a subgraph that is a tree and includes <b>every</b> vertex.</p>
      <p>A <b>minimum spanning tree</b> (MST) has the smallest total weight.</p>
      <ul><li><b>Prim's</b>: grow one tree, always adding the cheapest edge leaving it.</li><li><b>Kruskal's</b>: add the cheapest remaining edge anywhere, skipping any edge that would make a cycle.</li></ul>`),
    mc('Preorder traversal of the tree shown?', ['1 2 4 5 3', '4 2 5 1 3', '4 5 2 3 1', '1 2 3 4 5'], 0, 'Root, left, right: 1, then 2 (with 4, 5), then 3.', { viz: { type: 'tree', t: ['1', ['2', ['4'], ['5']], ['3']] } }),
    mc('Inorder traversal of the same tree?', ['4 2 5 1 3', '1 2 4 5 3', '4 5 2 3 1', '2 4 5 1 3'], 0, 'Left, root, right.', { viz: { type: 'tree', t: ['1', ['2', ['4'], ['5']], ['3']] } }),
    mc('Postorder traversal of the same tree?', ['4 5 2 3 1', '4 2 5 1 3', '1 2 4 5 3', '5 4 3 2 1'], 0, 'Left, right, root — the root comes last.', { viz: { type: 'tree', t: ['1', ['2', ['4'], ['5']], ['3']] } }),
    int('A connected graph has 12 vertices. How many edges does any spanning tree have?', 11, 'A tree on 12 vertices has 11 edges.'),
    int('Find the weight of the minimum spanning tree of the graph from the shortest-path lesson (A–B 4, A–C 2, B–C 1, B–D 5, C–D 8, D–E 3).', 11, 'Kruskal: B–C 1, A–C 2, D–E 3, skip A–B 4 (cycle), B–D 5. Total 1 + 2 + 3 + 5 = 11.'),
    mc('Kruskal\'s algorithm skips an edge when…', ['It would create a cycle', 'It is the cheapest', 'It touches a leaf', 'It is longer than the previous edge'], 0, 'A spanning tree can\'t contain cycles.')
  ])
]);
