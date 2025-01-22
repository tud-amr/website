---
title: "Globally-guided geometric fabrics for reactive mobile manipulation in dynamic environments"
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

<h2> Abstract </h2>
<p align="justify">
In dynamic environments shared by humans and robots, mobile manipulators must continuously adapt to real-time changes to execute tasks successfully. While global planning methods are effective at considering the full task scope, they lack the computational efficiency required for reactive adaptation. In contrast, local planning approaches can be executed online but are limited by their inability to account for the full task's duration.
To tackle this, we propose Globally-Guided Geometric Fabrics (G3F), a framework for real-time motion generation along the full task horizon, by interleaving an optimization-based planner with a fast reactive geometric motion planner, called geometric fabrics. 
The approach adapts the path and explores alternative target poses, while accounting for collision avoidance and the robot's physical constraints.
This results in a real-time adaptive framework considering whole-body motions, where a robot operates in close proximity to other robots and humans.
We validate our approach through various simulations and real-world experiments on mobile manipulators in multi-agent settings, achieving improved success rates compared to vanilla geometric fabrics, prioritized rollout fabrics and model predictive control. 
<br>
<br>
<i>Index Terms:</i> Path and motion planning, geometric fabrics, optimization-based planning, multi-agent environments
</p>

<h2> Real-world experiments </h2>
<h3> Comparison GF and G3F </h3>
<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h4 align="center">Geometric Fabrics</h4>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/g3f/dinovas_onestable_fabrics_ppt.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    - Unsuccessful grasps -
    </p>
  </div>
  <div class="col">
    <h4 align="center">G3F (ours)</h4>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/g3f/dinovas_onetable_gomp_ppt.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    - Successful grasps -
    </p>
  </div>
</div>
<p align="center">G3F explores <b>alternative grasp poses</b> based on the current state of the dynamic environment, allowing both robots to reach their target</p>

<h3>Pick and place scenario</h3>
<div>
    <!-- <h3 align="center">TamedPUMA</h3> -->
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/g3f/dinovas_pickplace_ppt.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    The proposed approach optimizes the path from start to goal for a <b>pick-and-place task, adapting the grasp and place pose</b> accordingly. 
    </p>
</div>

<h3>Human-centered environments</h3>
<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/g3f/gomp_human_scenario_1_ppt.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    (a)
    </p>
  </div>
  <div class="col">
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/g3f/gomp_human_scenario_2_ppt.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    (b)
    </p>
  </div>
</div>
<p align="center">In the presence of a <b>human agent</b>, G3F is able to react to the human <b>changing the target pose</b> online by moving the object, while <b>avoiding collisions with the human</b>.</p>

<h3>Static obstacles</h3>
<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/g3f/video_gomp_static_double_ppt.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    (a)
    </p>
  </div>
  <div class="col">
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/g3f/video_gomp_static_double_ppt.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    (b)
    </p>
  </div>
</div>
<p align="center">In the presence of <b>static obstacles</b>, G3F achieves its goal considering the full task horizon from start to goal.</p>

<h3>Static agents</h3>
<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/g3f/dinova_single_pickplace_1_ppt.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    (a)
    </p>
  </div>
  <div class="col">
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/g3f/dinova_gomp_noncooperative_agent_ppt.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    (b)
    </p>
  </div>
</div>
<p align="center">In the presence of <b>static agents</b>, G3F achieves its goal by adapting its grasp and place pose while considering the full task horizon.</p>

<h3>Crossover scenario</h3>
<div>
    <!-- <h3 align="center">TamedPUMA</h3> -->
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/g3f/dinovas_crossover_gomp_ppt.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    In this <b>decentralized multi-agent environment</b>, the robots solve a crossover scenario due to the <b>globally-guided</b> solution via G3F. 
    </p>
</div>

<h2>Simulation experiments</h2>
<div>
    <!-- <h3 align="center">TamedPUMA</h3> -->
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/g3f/dinovas_pybullet_mix_zoomout.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    The proposed G3F outperforms Geometric Fabrics (GF), Prioritzed Rollout Fabrics (P-RF) and MPC in terms of success rate over all four scenarios consisting of 20 randomized multi-agent environments. 
    </p>
</div>

<h2>Illustration of grasp pose optimization</h2>

<p align="justify"> Alternative target poses are explored based on the current state of the robot and the dynamic environment. In the Figure below, it is shown that the target pose is optimized with respect to the current end-effector pose of the robot. The axis along which the rotations are allowed, can vary based on the task. </p>
  <div class="container">
    <div id="fig-grasp1" class="image-div mb-3 d-flex justify-content-center">
      <img src="{{ '/assets/images/papers/g3f/grasp_constraint.png' | relative_url}}" class="img-fluid" alt="lab">
    </div>
    <div id="fig-grasp2" class="image-div mb-3 d-flex justify-content-center">
      <img src="{{ '/assets/images/papers/g3f/grasp_poses.png' | relative_url}}" class="img-fluid" alt="lab">
    </div>
  </div>


<h2>Specifications of G3F</h2>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  table, th, td {
    border: 1px solid black;
  }
  th, td {
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
</style>
<table>
    <caption>Table 1: Selection of the parameters used within G3F.</caption>
    <thead>
      <tr>
        <th></th>
        <th>Parameter</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td rowspan="8"><strong>&nbsp;  QP  &nbsp;</strong></td>
        <td>solver-type</td>
        <td>OSQP</td>
      </tr>
      <tr>
        <td>&epsilon;<sub>absolute</sub></td>
        <td>10<sup>-3</sup></td>
      </tr>
      <tr>
        <td>&epsilon;<sub>relative</sub></td>
        <td>10<sup>-3</sup></td>
      </tr>
      <tr>
        <td>max iterations</td>
        <td>1000</td>
      </tr>
      <tr>
        <td>H</td>
        <td>5</td>
      </tr>
      <tr>
        <td>T</td>
        <td>5 or 10</td>
      </tr>
      <tr>
        <td>Collision links</td>
        <td>[chassis_link, arm_upper_wrist_link]</td>
      </tr>
      <tr>
        <td>Collision link radii</td>
        <td>[0.65, 0.15] rad</td>
      </tr>
      <tr>
        <td rowspan="5"><strong>&nbsp;RF&nbsp;</strong></td>
        <td>K</td>
        <td>500</td>
      </tr>
      <tr>
        <td>&Delta;t</td>
        <td>0.05 s</td>
      </tr>
      <tr>
        <td>&alpha;<sub>velocity</sub></td>
        <td>0.7</td>
      </tr>
      <tr>
        <td>Collision links</td>
        <td>[chassis_link, arm_upper_wrist_link]</td>
      </tr>
      <tr>
        <td>Collision link radii</td>
        <td>[0.55, 0.2] rad</td>
      </tr>
      <tr>
        <td rowspan="2"><strong>&nbsp;GF&nbsp;</strong></td>
        <td>Collision links</td>
        <td>[chassis_link, arm_shoulder_link, arm_forearm_link,
       arm_lower_wrist_link, arm_upper_wrist_link, arm_end_effector_link]
        </td>
      </tr>
      <tr>
        <td>Collision link radii</td>
        <td>[0.45, 0.1, 0.1, 0.1, 0.1, 0.1] rad</td>
      </tr>
    </tbody>
  </table>


<!-- <h2>References</h2> -->
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