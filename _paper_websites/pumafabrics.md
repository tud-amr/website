---
title: "TamedPUMA: safe and stable imitation learning with geometric fabrics"
authors:
    - name: "Saray Bakker"
      # url: "https://andreumatoses.github.io/"
      superscript: "1"
    - name: "Rodrigo Pérez-Dattari"
      url: "https://rperezdattari.github.io/"
      superscript: "1"
    - name: "Cosimo Della Santina"
      url: "https://cosimodellasantina.eu/"
      superscript: "1"
    - name: "Wendelin Böhmer"
      url: "https://www.tudelft.nl/ewi/over-de-faculteit/afdelingen/software-technology/algorithmics/people/wendelin-boehmer"
      superscript: "2"
    - name: "Javier Alonso-Mora"
      url: "https://autonomousrobots.nl/people/"
      superscript: "1"
affiliations:
    # - name: "Equal contribution"
    #   superscript: "*"
    - name: "Mechanical Engineering,"
      superscript: "1"
      url: "https://tudelft.nl"
    - name: "Electrical Engineering, Mathematics & Computer Science, TU Delft"
      superscript: "2"
      url: "https://tudelft.nl"
release_date: 2024-11-01 # publication or relevant date, approximated if not sure. Just for display purposes and ordering.
links: # If you have other website for the project, github repos, datasets, etc. put it here. You can also add an icon from https://icons.getbootstrap.com/
    # - name: IEEE Xplore
    #   icon: bi-file-earmark-pdf
    #   url: "https://doi.org/10.1109/LRA.2024.3397083"
    # - name: arXiv
    #   icon: bi-file-earmark-pdf
    #   url: "https://arxiv.org"
    - name: Code (released on publication)
      icon: bi-github
      url: https://github.com/saraybakker1/PumaFabrics
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

<!-- <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h3 align="center">PUMA</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/pumafabrics/pure_puma_1.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Via PUMA, the demonstrated movement is learned while ensuring goal converge. Obstacle avoidance and physical constraints are <b> NOT </b> considered.
    </p>
  </div>
  <div class="col">
    <h3 align="center">TamedPUMA (ours)</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/pumafabrics/cpm.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Via TamedPUMA, PUMA is enhanced for safe and stable navigation. <b>Whole-body collision avoidance</b> and <b>joint limits</b> are incorporated. 
    </p>
  </div>
</div> -->
<div>
    <!-- <h3 align="center">TamedPUMA</h3> -->
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/pumafabrics/cpm.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    By leveraging the recently introduced geometric framework for motion planning called geometric fabrics, 
our approach learns stable motion profiles while considering online whole-body collision-avoidance and joint limits.
    </p>
</div>

<h2> Abstract </h2>
<p align="justify">
Using the language of dynamical systems, Imitation learning (IL) provides an intuitive and effective way of teaching stable task-space motions to robots with goal convergence. Yet, IL techniques are affected by serious limitations when it comes to ensuring safety and fulfillment of physical constraints. With this work, we solve this challenge via TamedPUMA, an IL algorithm augmented with a recent development in motion planning called geometric fabrics. 
As both the IL policy and geometric fabrics describe motions as artificial second-order dynamical systems, we propose two variations where IL provide a navigation policy for geometric fabrics. 
The result is a stable imitation learning strategy within which we can seamlessly blend geometrical constraints like collision avoidance and joint limits.
Beyond providing a theoretical analysis, we demonstrate TamedPUMA with simulated and real-world tasks, including a 7-DoF manipulator. 
<br>
<br>
Keywords: Imitation Learning, Dynamical Systems, Geometric Motion Planning, Fabrics, Movement Primitives
</p>

<h2> Illustrative Point-mass Example </h2>
In <a href="#fig-pointmass">Fig. 1</a> , trajectories are shown of a 2D point-mass example for the proposed methods, alongside baselines of geometric fabrics<span class="citation" onclick="document.getElementById('ratliff2020optimization').scrollIntoView();"><sup>[1, 2]</sup></span> with a manually designed potential function, and PUMA<span class="citation" onclick="document.getElementById('perezdattari2024deep').scrollIntoView();"><sup>[3]</sup></span>. The purely data-driven method PUMA follows the motion profile as learned from demonstrations, although it has no notion of obstacle avoidance or other physical constraints. The proposed methods, FPM and CPM, successfully follow the desired motion profile of PUMA, while avoiding collisions with the obstacles. In contrast, geometric fabrics are unable to follow the desired motion profile. 
<div id="fig-pointmass" class="image-div mb-3 d-flex justify-content-center">
    <img src="{{ '/assets/images/papers/pumafabrics/point_mass_comparison_plot.jpg' | relative_url}}" class="img-fluid" width="800" alt="lab">
</div>

<h2> Experiment: Tomato picking with a 7-DoF manipulator</h2>
<h3> Demonstrating the tomato-picking task</h3>
<!-- <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2"> -->
  <div class="col">
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/pumafabrics/demonstrations_from_ppt.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    </p>
  <!-- </div>
  <div class="col">
    <h3 align="center">Human disturbances</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-4x3">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/biased_mppi/crossing_AC_crop.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    When a human disturbs the robot, TamedPUMA can recover and <b> converges to the goal</b>.
    </p>
  </div>
</div> -->
<!-- <div class="row row-cols-1 row-cols-sm-3 row-cols-md-3 g-2">
  <div class="col">
    <h3 align="center">Switching Controller</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <h5 align="center">Tracking Mode</h5>
        <img class="img-fluid object-fit-contain" src="{% include fix_link.html link='/assets/images/papers/pumafabrics/point_mass_comparison_plot.jpg' %}" alt="Image 1">
        <p align="center">
        Traget defined in world frame
        </p> 
      </div>
    </div>
    <p align="center">
    Uses heuristics to switch between an EBC for swingup, an LQR for stabilization, and an LQI for tracking a reference with the arm when the pendulum is at the top equilibrium.
    </p>
  </div>
  <div class="col">
    <h3 align="center">Classic MPPI</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/biased_mppi/pendulum_nobias.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Takes 100 samples around a time shifted version of the previous plan.
    </p>
  </div>
  <div class="col">
    <h3 align="center">Biased-MPPI</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-16x9">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/biased_mppi/pendulum_bias.m4v' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Samples all the ancillary controllers used by the switching controller once, and takes the remaining samples around the previous plan.
    </p>
  </div>
</div> -->
<h3> Results of the tomato-picking task with TamedPUMA</h3>
Via TamedPUMA, PUMA is enhanced for safe and stable navigation, while accounting for whole-body collision avoidance and joint limits. We propose two variations, the Forcing Policy Method (FPM) and the Compatible Potential Method (CPM).
<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h3 align="center">FPM</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-4x3">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/pumafabrics/FPM_43.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    In the FPM, convergence to the goal is not guaranteed, but works well in practice. 
    </p>
  </div>
  <div class="col">
    <h3 align="center">CPM</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-4x3">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/pumafabrics/cpm43.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    CPM provides a <b>stronger notion of goal convergence</b> than the FPM. In practice, the performance is similar to FPM.
    </p>
  </div>
</div>

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h3 align="center">An out-of-distribution scenario</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-4x3">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/pumafabrics/video_out_of_distribution43.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    When an obstacle forces the robot towards a pose <b>far from the demonstrations</b>, TamedPUMA recovers and <b>reaches the goal</b>.
    </p>
  </div>
  <div class="col">
    <h3 align="center">Human disturbances</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-4x3">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/pumafabrics/video_human_disturbance43.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    When a human disturbs the robot, TamedPUMA can recover and <b> converges to the goal</b>.
    </p>
  </div>
</div>

<h2> Experiment: Pouring a liquid </h2>
<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h3 align="center">Avoiding the helmet</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-4x3">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/pumafabrics/helmet_pouring43.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    TamedPUMA <b>avoids collisions with the helmet</b> while performing a learned pouring task. 
    </p>
  </div>
  <div class="col">
    <h3 align="center">Online goal changes</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-4x3">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/pumafabrics/goal_change_good1_43.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Using TamedPUMA, <b>the goal can be changed online</b>.
    </p>
  </div>
</div>

<h2> Comparison with geometric fabrics and PUMA</h2>
Note: The following videos might not display in Chrome, but they do render in Firefox, we are addressing this problem!
<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h3 align="center">Geometric Fabrics</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-4x3">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/pumafabrics/scenario3_fabrics_43.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    <b>Fabrics causes a deadlock scenario</b> with two obstacles representing the side of the box.
    </p>
  </div>
  <div class="col">
    <h3 align="center">TamedPUMA (ours)</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-4x3">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/pumafabrics/scenario3_CPM_no_obst2_43.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    The DNN encodes an <b>intuitive movement</b> to avoid the side of the box.
    </p>
  </div>
</div>

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-2">
  <div class="col">
    <h3 align="center">PUMA</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-4x3">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/pumafabrics/pure_puma_1_43.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Via PUMA, the demonstrated movement is learned while ensuring goal converge. Obstacle avoidance and physical constraints are <b> NOT </b> considered.
    </p>
  </div>
  <div class="col">
    <h3 align="center">TamedPUMA (ours)</h3>
    <div class="teaser-video d-flex justify-content-center">
      <div class="ratio ratio-4x3">
        <video id="teaser" autoplay="" muted="" controls="" loop="" playsinline="">
          <source src="{% include fix_link.html link='/assets/images/papers/pumafabrics/cpm43.mp4' %}" type="video/mp4">
        </video>
      </div>
    </div>
    <p align="center">
    Via TamedPUMA, PUMA is enhanced for safe and stable navigation. <b>Whole-body collision avoidance</b> and <b>joint limits</b> are incorporated. 
    </p>
  </div>
</div>

<h2>Supplementary theoretical details on TamedPUMA</h2>
<a href="pumafabrics-details">This link guides to the webpage with theoretical details on TamedPUMA.</a>
<div>
<!-- A PDF of these supplementary theoretical details can be found <a href="https://github.com/saraybakker1/pumafabrics/blob/main/assets/paper/tamedpuma_supplementary_material.pdf">HERE</a> (released upon publication). -->

<h3> Specifications of the DNN by PUMA </h3>
<div>
<a href="#table-hyperparameters">Table 1</a>  contains specifications of the trained DNN for the tomato-picking task and pouring task. The network provides a second-order dynamical system where positions are trained over a Euclidian space and orientations over a spherical space. An illustration of the performance is provided in
<a href="#fig-primitive-0-iter-5000cut">Figure 3</a> at 5000 iterations. This shows the convergence to goal and the closeness of the solutions to the demonstrated motion profile by the user. A DNN with 5000 iterations takes 9 minutes to train on a standard laptop (i7-12700H) and 0.6 $\pm$ 0.1 ms to request an action from the DNN online.
</div>
<br>
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
</div>
<table id="table-hyperparameters">
  <caption>Table 1. Hyperparameters of PUMA for a second-order dynamical system learning a pose, e.g. position and orientation.</caption>
  <thead>
    <tr>
      <th></th>
      <th>Hyperparameter</th>
      <th>Value (tomato-picking)</th>
      <th>Value (pouring)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="6"><strong>PUMA</strong></td>
      <td>Stability loss margin ($m$)</td>
      <td>1e-6</td>
      <td>1e-6</td>
    </tr>
    <tr>
      <td>Triplet imitation loss weight ($\lambda$)</td>
      <td>1.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <td>Window size imitation ($\mathcal{H}^i$)</td>
      <td>13</td>
      <td>13</td>
    </tr>
    <tr>
      <td>Window size stability ($\mathcal{H}^s$)</td>
      <td>2</td>
      <td>2</td>
    </tr>
    <tr>
      <td>Batch size imitation ($\mathcal{B}^i$)</td>
      <td>800</td>
      <td>800</td>
    </tr>
    <tr>
      <td>Batch size stability ($\mathcal{B}^s$)</td>
      <td>800</td>
      <td>800</td>
    </tr>
    <tr>
      <td rowspan="6"><strong>Neural Network</strong></td>
      <td>Optimizer</td>
      <td>Adam</td>
      <td>Adam</td>
    </tr>
    <tr>
      <td>Number of iterations</td>
      <td>40000</td>
      <td>27000</td>
    </tr>
    <tr>
      <td>Learning rate</td>
      <td>1e-4</td>
      <td>1e-4</td>
    </tr>
    <tr>
      <td>Activation function</td>
      <td>GELU</td>
      <td>GELU</td>
    </tr>
    <tr>
      <td>Num. layers ($\varphi_{\theta}, \rho_\theta$)</td>
      <td>(3, 3)</td>
      <td>(3, 3)</td>
    </tr>
    <tr>
      <td>Layer normalization</td>
      <td>yes</td>
      <td>yes</td>
    </tr>
  </tbody>
</table>

<style>
  .image-div {
    display: flex;
    justify-content: center;
  }
  figure {
    text-align: center;
  }
</style>

<div id="fig-primitive-0-iter-5000cut" class="image-div mb-3 d-flex justify-content-center">
  <figure>
    <img src="{{ '/assets/images/papers/pumafabrics/primitive_0_iter_5000cut.jpg' | relative_url}}" class="img-fluid" width="800" alt="lab">
     <figcaption>Figure 3. Performance of the DNN trained via PUMA where all states are normalized. The demonstrations are indicated in black, the trajectories generated by the DNN for the same initial poses as the demonstrations are given in red, and trajectories from randomly sampled initial conditions are indicated in blue.</figcaption>
    </figure>
</div>

<h2>References</h2>
<ol>
  <li id="ratliff2023fabrics">
    Ratliff, Nathan, and Van Wyk, Karl. (2023). "Fabrics: A Foundationally Stable Medium for Encoding Prior Experience." <em>arXiv preprint arXiv:2309.07368</em>.
  </li>
<li id="ratliff2020optimization">
  Ratliff, Nathan D., Van Wyk, Karl, Xie, Mandy, Li, Anqi, and Rana, Muhammad Asif. (2020). "Optimization fabrics." <em>arXiv preprint arXiv:2008.02399</em>.
</li>
<li id="perezdattari2024deep">
  Pérez-Dattari, Rodrigo, Della Santina, Cosimo and Kober, Jens. (2024). "Deep metric imitation learning for stable motion primitives." <em>Advanced Intelligent Systems</em>.
</li>
</ol>