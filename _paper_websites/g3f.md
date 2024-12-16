---
title: "Object-informed motion generation for reactive multi-agent mobile
manipulation"
authors:
    - name: "Tomas Merva*"
      url: "https://tomasmerva.github.io/"
      superscript: "1, 2"
    - name: "Saray Bakker*"
      url: "https://saraybakker1.github.io/"
      superscript: "1"
    - name: "Max Spahn"
      url: "https://github.com/maxspahn"
      superscript: "1"
    - name: "Danning Zhao"
      superscript: "1"
    - name: "Ivan Virgala"
      superscript: "2"
      url: "https://www.sjf.tuke.sk/km/en/department/staff/20-frontpage/410-ivan-virgala"
    - name: "Javier Alonso-Mora"
      url: "https://autonomousrobots.nl/people/"
      superscript: "1"
affiliations:
    - name: "Equal contribution"
      superscript: "*"
    - name: "Mechanical Engineering, TU Delft, The Netherlands"
      superscript: "1"
      url: "https://tudelft.nl"
    - name: "Industrial Automation and Mechatronics, Technical University of Kosice, Slovakia."
      superscript: "2"
      url: "https://tudelft.nl"
release_date: 2025-02-01 # publication or relevant date, approximated if not sure. Just for display purposes and ordering.
links: # If you have other website for the project, github repos, datasets, etc. put it here. You can also add an icon from https://icons.getbootstrap.com/
    # - name: IEEE Xplore
    #   icon: bi-file-earmark-pdf
    #   url: "https://doi.org/10.1109/LRA.2024.3397083"
    # - name: arXiv
    #   icon: bi-file-earmark-pdf
    #   url: "https://arxiv.org"
    - name: Code (released on publication)
      icon: bi-github
      url: https://github.com/tud-amr
    # - name: Video
    #   icon: bi-youtube
    #   url: "https://youtu.be/1ZbbcfFgpxc"
    - name: Related Publications
      icon: bi-file-text
      url: "#related-publications"
related_project_id: "saraypapers"
---
<div>
{% if page.usemathjax %}
<script>
MathJax = {
  tex: {
    tags: 'ams',
    inlineMath: [['$', '$']],
    displayMath: [['$$', '$$']],
    packages: {'[+]': ['ams']}, 
    processEscapes: true,
    macros: {
      norm: ["\\left\\lVert #1 \\right\\rVert", 1],
      vec: "\\boldsymbol",
      qdot: "\\dot{\\q}",
      qddot: "\\ddot{\\q}",
      q: "\\vec{q}",
      h: "\\vec{h}",
      f: "\\vec{f}",
      fC: "\\f^{\\mathcal{C}}_{\\theta}",
    }
  // svg: {
  //   fontCache: 'global'
  //  }
  }
};        
</script>
    <script type="text/javascript" id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    {% endif %}
</div>

<p align="justify">
<b>This page is under contruction, stay tuned!</b>
</p>

<h2> Abstract </h2>
<p align="justify">
Mobile manipulators operating in dynamic environments shared with humans and robots must adapt in real time to environmental changes to complete their tasks effectively. While global planning methods are effective at considering the full task scope, they lack the computational efficiency required for reactive adaptation. In contrast, local planning approaches can be executed online but are limited by their inability to account for the full task's duration.
To tackle this, we propose Globally-Guided Geometric Fabrics (G3F), a framework for real-time motion generation along the full task horizon, by interleaving an optimization-based planner with a fast reactive geometric motion planner, called geometric fabrics. 
The approach adapts the path and the precomputed target pose candidate toward the goal, accounting for collision avoidance and the robot's physical constraints.
This results in a real-time adaptive framework considering whole-body motions, where a robot operates in close proximity to other robots
and humans.
We validate our approach through various simulations and real-world experiments on mobile manipulators in multi-agent settings, achieving improved success rates compared to vanilla geometric fabrics, prioritized rollout fabrics and model predictive control. 
<br>
<br>
Index Terms: Geometric Motion Planning, Fabrics, Optimization-based methods, Globally-guided planning, Multi-agent environments
</p>


<h2>References</h2>
<!-- <ol>
  <li id="ratliff2023fabrics">
    Ratliff, Nathan, and Van Wyk, Karl. (2023). "Fabrics: A Foundationally Stable Medium for Encoding Prior Experience." <em>arXiv preprint arXiv:2309.07368</em>.
  </li>
<li id="ratliff2020optimization">
  Ratliff, Nathan D., Van Wyk, Karl, Xie, Mandy, Li, Anqi, and Rana, Muhammad Asif. (2020). "Optimization fabrics." <em>arXiv preprint arXiv:2008.02399</em>.
</li>
<li id="perezdattari2024deep">
  Pérez-Dattari, Rodrigo, Della Santina, Cosimo and Kober, Jens. (2024). "Deep metric imitation learning for stable motion primitives." <em>Advanced Intelligent Systems</em>.
</li> -->
<!-- </ol> -->