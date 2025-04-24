---
title: "Embedded Hierarchical MPC for Autonomous Navigation"
authors:
    - name: "Dennis Benders"
      superscript: "1"
    - name: "Johannes Köhler"
      superscript: "2"
    - name: "Thijs Niesten"
      superscript: "1"
    - name: "Robert Babuška"
      superscript: "1,3"
    - name: "Javier Alonso-Mora"
      superscript: "1"
    - name: "Laura Ferranti"
      superscript: "1"
affiliations:
    - name: "TU Delft"
      superscript: "1"
      url: "https://tudelft.nl"
    - name: "ETH Zürich"
      superscript: "2"
      url: "https://ethz.ch/en.html"
    - name: "CTU Prague"
      superscript: "3"
      url: "https://www.cvut.cz/en/"
release_date: 2025-04-19 # publication or relevant date, approximated if not sure. Just for display purposes and ordering.
links: # If you have other website for the project, github repos, datasets, etc. put it here. You can also add an icon from https://icons.getbootstrap.com/
    # - name: IEEE Xplore
    #   icon: bi-file-earmark-pdf
    #   url: "https://doi.org/10.1109/TRO.2024.3475047"
    - name: arXiv
      icon: bi-file-earmark-pdf
      url: "https://arxiv.org/abs/2406.11506"
    - name: Code
      icon: bi-github
      url: https://github.com/dbenders1/hmpc
    - name: Video
      icon: bi-youtube
      url: "https://youtu.be/0RnrKk6830I"
    # - name: Related Publications
    #   icon: bi-file-text
    #   url: "#related-publications"
related_project_id: "drones-emergency"
---
<!-- Simulated Mobile Robot | Real-World Mobile Robot | -->
<!-- | ------------- | ------------- | -->
<!-- | <img src="https://imgur.com/YZNLaww.gif" width="100%"> | <img src="https://imgur.com/861MmhI.gif" width=100%> | -->
<!-- | **Static and Dynamic Obstacles** |  | -->
<!-- | <img src="https://imgur.com/QgYDTRq.gif" width="100%"> |  | -->
<hr/>
<h2 align="center"><u>Abstract</u></h2>
  <p align="justify">
    To efficiently deploy robotic systems in society, mobile robots must move autonomously and safely through complex environments. Nonlinear model predictive control (MPC) methods provide a natural way to find a dynamically feasible trajectory through the environment without colliding with nearby obstacles. However, the limited computation power available on typical embedded robotic systems, such as quadrotors, poses a challenge to running MPC in real time, including its most expensive tasks: constraints generation and optimization. To address this problem, we propose a novel hierarchical MPC (HMPC) scheme that consists of a planning and a tracking layer. The planner constructs a trajectory with a long prediction horizon at a slow rate, while the tracker ensures trajectory tracking at a relatively fast rate. We prove that the proposed framework avoids collisions and is recursively feasible. Furthermore, we demonstrate its effectiveness in simulations and lab experiments with a quadrotor that needs to reach a goal position in a complex static environment. The code is efficiently implemented on the quadrotor's embedded computer to ensure real-time feasibility. Compared to a state-of-the-art single-layer MPC formulation, this allows us to increase the planning horizon by a factor of 5, which results in significantly better performance.
  </p>
<hr/>
<h2 align="center"><u>Embedded HMPC</u></h2>
<div class="row">
  <div class="col-6">
    <img src="{% include fix_link.html link='/assets/images/papers/hmpc/HMPC_system_diagram.svg' %}" width="100%">
  </div>
  <div class="col-6">
    <p align="justify">

    The proposed hierarchical MPC scheme consists of a planning and a tracking layer. The planner constructs a trajectory with a long prediction horizon at a slow rate, while the tracker ensures trajectory tracking at a relatively fast rate. We prove that the proposed framework avoids collisions and is recursively feasible.
    </p>
  </div>
</div>
<hr/>
<h2 align="center"><u>HMPC versus SMPC</u></h2>
  <div class="row">
    <div class="col-6">
      <p align="justify">
      The closed-loop trajectory of (a) the baseline single-layer MPC (SMPC) scheme and (b) the proposed HMPC scheme. Whereas SMPC solves the planning and tracking tasks in a single-layer formulation, HMPC decouples the tasks using a planning MPC and a tracking MPC that use the same nonlinear model but run at different frequencies. SMPC uses the same nonlinear model as PMPC and TMPC and is sampled at the same rate as TMPC to ensure reliable operation. Both schemes fly from start to goal position and avoid the obstacles. Compared to SMPC, HMPC has a significantly longer planning horizon, given the limited computational resources on the onboard computer, and does not have to balance planning and tracking tasks. Therefore, HMPC reaches the goal faster, is less sensitive to model mismatch, and maintains altitude better than SMPC.
      </p>
    </div>
    <div class="col-6">
      <img src="{% include fix_link.html link='/assets/images/papers/hmpc/smpc_hmpc_front_page.webp' %}" width="100%">
    </div>
</div>
<hr/>
<!-- Insert link to Youtube video -->
<h2 align="center"><u>And more!</u></h2>
  <p align="justify">
    HMPC has more capabilities. Interested? Check out the <a href="https://youtu.be/0RnrKk6830I">YouTube video</a> and the <a href="https://github.com/dbenders1/hmpc">code</a>!<br>Special care has been taken to construct the repository according to the guidelines presented in recent work<span class="citation" onclick="document.getElementById('cervera2018try').scrollIntoView();"><sup>[1]</sup></span> to enhance method reproducibility.
  </p>
<hr/>
<h2 align="center"><u>Research platform</u></h2>
<div class="row">
  <div class="col-6">
    <img src="{% include fix_link.html link='/assets/images/papers/hmpc/Lab_setup.svg' %}" width="100%">
  </div>
  <div class="col-6">
    <p align="justify">
      The platform used in the lab experiments of this work is based on the <a href="https://nxp.gitbook.io/hovergames/">NXP HoverGames kit</a>. On top of this kit, we have added an NVIDIA Jetson Xavier NX embedded computer that runs all code.
    </p>
  </div>
</div>
<hr/>
<h2>References</h2>
<ol>
  <li id="cervera2018try">
    E. Cervera, “Try to start it! the challenge of reusing code in robotics research,” <em>IEEE Robotics and Automation Letters</em>, vol. 4, no. 1, pp. 49–56, 2018.
  </li>
</ol>
