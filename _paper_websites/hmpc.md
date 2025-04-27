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
<style>
    ol.figure-list {
        list-style-type: none;
        counter-reset: list-counter;
        padding-left: 10px;
    }
    ol.figure-list li::before {
        counter-increment: list-counter;
        content: "(" counter(list-counter, lower-alpha) ")";
        padding-right: 8px;
    }
</style>
<style>
    ol.ref-list {
        list-style-type: none;
        counter-reset: list-counter;
        padding-left: 10px;
    }
    ol.ref-list li::before {
        counter-increment: list-counter;
        content: "[" counter(list-counter) "]";
        padding-right: 8px;
    }
</style>
<!-- Simulated Mobile Robot | Real-World Mobile Robot | -->
<!-- | ------------- | ------------- | -->
<!-- | <img src="https://imgur.com/YZNLaww.gif" width="100%"> | <img src="https://imgur.com/861MmhI.gif" width=100%> | -->
<!-- | **Static and Dynamic Obstacles** |  | -->
<!-- | <img src="https://imgur.com/QgYDTRq.gif" width="100%"> |  | -->
<hr/>
<h2 align="center"><u>Teaser</u></h2>
<div class="row">
  <div class="col-6">
    <img src="{% include fix_link.html link='/assets/images/papers/hmpc/smpc_hmpc_front_page.webp' %}" width="100%">
  </div>
  <div class="col-6">
    <p align="justify">
      The closed-loop trajectory of (a) the baseline single-layer MPC (SMPC) scheme and (b) the proposed HMPC scheme. Whereas SMPC solves the planning and tracking tasks in a single-layer formulation, HMPC decouples the tasks using a planning MPC and a tracking MPC that use the same nonlinear model but run at different frequencies. SMPC uses the same nonlinear model as PMPC and TMPC and is sampled at the same rate as TMPC to ensure reliable operation. Both schemes fly from start to goal position and avoid the obstacles. Compared to SMPC, HMPC has a significantly longer planning horizon, given the limited computational resources on the onboard computer, and does not have to balance planning and tracking tasks. Therefore, HMPC reaches the goal faster, is less sensitive to model mismatch, and maintains altitude better than SMPC.
    </p>
  </div>
</div>
<hr/>
<h2 align="center"><u>Abstract</u></h2>
<p align="justify">
  To efficiently deploy robotic systems in society, mobile robots must move autonomously and safely through complex environments. Nonlinear model predictive control (MPC) methods provide a natural way to find a dynamically feasible trajectory through the environment without colliding with nearby obstacles. However, the limited computation power available on typical embedded robotic systems, such as quadrotors, poses a challenge to running MPC in real time, including its most expensive tasks: constraints generation and optimization. To address this problem, we propose a novel hierarchical MPC (HMPC) scheme that consists of a planning and a tracking layer. The planner constructs a trajectory with a long prediction horizon at a slow rate, while the tracker ensures trajectory tracking at a relatively fast rate. We prove that the proposed framework avoids collisions and is recursively feasible. Furthermore, we demonstrate its effectiveness in simulations and lab experiments with a quadrotor that needs to reach a goal position in a complex static environment. The code is efficiently implemented on the quadrotor's embedded computer to ensure real-time feasibility. Compared to a state-of-the-art single-layer MPC formulation, this allows us to increase the planning horizon by a factor of 5, which results in significantly better performance.
</p>
<hr/>
<h2 align="center"><u>Embedded HMPC</u></h2>
<div class="row">
  <div class="col-6">
    <img src="{% include fix_link.html link='/assets/images/papers/hmpc/HMPC_system_diagram.png' %}" width="100%">
  </div>
  <div class="col-6">
    <p align="justify">
      The <b>goal</b> is to plan and track a collision-free trajectory towards goal position $\boldsymbol{p}^\mathrm{g}$ given the initial position of the mobile robot and grid map $\mathcal{M}$ of the environment.
      <br><br>
      Below, we summarize some important properties of the proposed HMPC scheme. Please refer to <a href="https://arxiv.org/html/2406.11506v2#S5">Section V</a> in the paper for more details.
    </p>
  </div>
</div>
<br>
<div class="row">
  <div class="col-6">
    <p align="justify">
      In <b>offline</b> phase, we compute the terminal ingredients of the tracking MPC (TMPC). These ingredients include terminal cost matrix $P$ and feedback control gain $K$ that renders a sublevel set of the terminal cost function invariant. This sublevel set is the terminal set and its size is given by terminal set scaling $\alpha$. Furthermore, we compute Lipschitz constants $\boldsymbol{c}^\mathrm{s}$ and $c^\mathrm{o}$ for the planning MPC (PMPC), such that the TMPC satisfies the original system and obstacle avoidance constraints if these constraints are tightened by a multiplication of the tightening constants and $\alpha$ in the PMPC formulation.
      <br>
      See Algorithm 1 in the paper for more details on the offline design.
    </p>
  </div>
  <div class="col-6">
    <p align="justify">
      In <b>online</b> phase, we:
      <ul>
        <li>generate obstacle avoidance constraints using the <i>I-DecompUtil</i> method explained below;</li>
        <li>optimize a dynamically feasible and collision-free trajectory by solving the PMPC problem with a goal-oriented objective function and tightened constraints. See <a href="https://arxiv.org/html/2406.11506v2#S3">Section III</a> in the paper for more details on the properties that the trajectory needs to satisfy;</li>
        <li>communicate the optimized trajectory and corresponding obstacle avoidance constraints from PMPC to TMPC via the specific interconnection scheme explained next;</li>
        <li>track the trajectory and satisfy the constraints by solving the TMPC problem with reference tracking objective and terminal set constraint.</li>
      </ul>
      See Algorithm 2 in the paper for more details on the online design.
    </p>
  </div>
</div>
<br>
<p align="justify">
  This following figure illustrates the interconnection scheme between PMPC and TMPC using a 1D state trajectory example:
  <ol class="figure-list">
    <li>At time $t_i-T^{\mathrm{s},\mathrm{t}}$, the TMPC optimizes a trajectory (orange) over horizon $T^\mathrm{t}$ starting from forward-simulated state $\hat{\boldsymbol{x}}_{0|t_i}^t$ (purple), which is the model response when applying $\boldsymbol{u}_{[0,T^{\mathrm{s},\mathrm{t}}]|t_i-T^{\mathrm{s},\mathrm{t}}}^{\mathrm{t},*}$ starting from current state $\boldsymbol{x}_{t_i-T^{\mathrm{s},\mathrm{t}}}$ (green). The trajectory ends in terminal set $\mathcal{X}^\mathrm{f,t}$ around the reference trajectory $\boldsymbol{x}_{\tau|t_i}^\mathrm{r}$ (red) that becomes valid at $t_i$. $\boldsymbol{x}_{\tau|t_i}^\mathrm{r}$ is the sub-sampled version of reference plan $\boldsymbol{x}_{\tau|t_i}^{\mathrm{p},*}$ (blue).</li>
    <li>In this example, the TMPC executes 2 more times ($\tau \in \{0,T^{\mathrm{s},\mathrm{t}}\}$) until the next reference trajectory becomes valid, thereby getting closer to the reference.</li>
    <li>At time $t_{i+1}-T^{\mathrm{s},\mathrm{t}}$, the TMPC starts optimizing a trajectory based on a new reference plan $\boldsymbol{x}_{\tau|t_{i+1}}^{\mathrm{p},*}$ that becomes valid at $t_{i+1}$. This reference plan is optimized by the PMPC starting at time $t_i - T^{\mathrm{s},\mathrm{t}}$.</li>
  </ol>
</p>
<img src="{% include fix_link.html link='/assets/images/papers/hmpc/HMPC_timing.png' %}" width="100%">
<hr/>
<h2 align="center"><u>Obstacle avoidance generation using <i>I-DecompUtil</i></u></h2>
<p align="justify">
  The figure below gives a 2D visualization of map pre-processing and <i>I-DecompUtil</i>, given occupied grid cells $\tilde{\mathcal{O}}$ and the last optimized plan $\boldsymbol{x}_{\tau|t}^*$:
  <ol class="figure-list">
    <li>The obstacles are inflated by half of the robot radius (orange arrows).</li>
    <li>To construct the obstacle avoidance constraints around a specific line segment, first, a subset of the grid map $\mathcal{M}$ is selected such that the bounding box $\mathcal{B}$ with any orientation fits in this subset.</li>
    <li>The obstacle avoidance constraints $\mathcal{F}_{\tau|t+T^\mathrm{s,p}}$ are constructed according to the <i>DecompUtil</i> method<span class="citation" onclick="document.getElementById('liu2017planning').scrollIntoView();"><sup>[1]</sup></span> by growing an ellipsoid around the line segment, creating the tangential lines and clipping them to $\mathcal{B}$. Furthermore, $\mathcal{F}_{\tau|t+T^\mathrm{s,p}}$ are tightened by the other half of the robot radius, such that the robot does not collide with the obstacles if its center satisfies $\mathcal{F}_{\tau|t+T^\mathrm{s,p}}$.</li>
    <li>The tightened obstacle avoidance constraints $\bar{\mathcal{F}}_{\tau|t+T^\mathrm{s,p}}$ are constructed by tightening $\mathcal{F}_{\tau|t+T^\mathrm{s,p}}$ with $c^\mathrm{o} \alpha$, visualized using terminal set $\mathcal{X}^\mathrm{f,t}$ in this figure.</li>
  </ol>
  Note that (b)-(d) are repeated for all line segments.
</p>
<img src="{% include fix_link.html link='/assets/images/papers/hmpc/HMPC_obstacle_avoidance_constraints.png' %}" width="100%">
<p align="justify">
  Please refer to <a href="https://arxiv.org/html/2406.11506v2#S4">Section IV</a> in the paper for more details on the design of the obstacle avoidance generation.
  <br><br>
  Want to know how to efficiently implement this method on an embedded computer? Checkout <a href="https://arxiv.org/html/2406.11506v2#S6">Section VI-B1</a> in the paper!
</p>
<hr/>
<h2 align="center"><u>Results</u></h2>
<p align="justify">
  We demonstrate two types of results:
  <ol>
    <li>HMPC properties.</li>
    <li>Performance comparison with a baseline single-layer MPC (SMPC) scheme.</li>
  </ol>
  Please refer to <a href="https://arxiv.org/html/2406.11506v2#S6">Section VI</a> in the paper for more details on the results.
</p>
<h3 align="center"><u>HMPC properties</u></h3>
<div class="row">
  <div class="col-6">
    <p align="justify">
      This figure shows a specific snapshot of the <i>TMPC prediction</i> starting from forward-simulated state <i>TMPC init state</i> and ending in the terminal set, given the obstacles, their collision region based on robot region $\mathcal{R}$, reference plan <i>PMPC prediction</i> and corresponding reference trajectory <i>TMPC ref traj</i>, and obstacle avoidance constraints <i>PMPC obs con</i>. Note that the PMPC obstacle avoidance constraints are tightened with respect to TMPC obstacle avoidance constraints <i>TMPC obs con</i>, and <i>Current state</i> and forward-simulated state do not overlap, showing the presence of model mismatch.
    </p>
  </div>
  <div class="col-6">
    <img src="{% include fix_link.html link='/assets/images/papers/hmpc/2024-05-16_exp_hg_2_obs_tmpc_prediction.png' %}" width="100%">
  </div>
</div>
<p align="justify">
  The animation below shows the the RViZ visualization of the quadrotor flying in the lab using the HMPC scheme:
</p>
<img src="{% include fix_link.html link='/assets/images/papers/hmpc/hmpc.gif' %}" width="100%">
<p align="justify">
  In summary, based on all HMPC results, we conclude that:
  <ol>
    <li>HMPC is able to efficiently navigate from start to goal position while avoiding the obstacles;</li>
    <li>HMPC runs in real time on the quadrotor's embedded computer;</li>
    <li>In the absence of model mismatch, HMPC guarantees obstacle avoidance and recursive feasibility;</li>
    <li>In the presence of model mismatch, HMPC is empirically shown to avoid obstacles and run without infeasibility of both PMPC and TMPC.</li>
  </ol>
</p>
<h3 align="center"><u>Performance comparison with SMPC</u></h3>
<div class="row">
  <div class="col-6">
    <img src="{% include fix_link.html link='/assets/images/papers/hmpc/2024-05-16_exp_hg_2_obs_smpc_hmpc_trajectories_vel.png' %}" width="100%">
  </div>
  <div class="col-6">
    <p align="justify">
      We compared the performance of the proposed HMPC scheme with SMPC in simulations and lab experiments. The figure on the right shows the 2D closed-loop SMPC and HMPC trajectories with associated velocities in lab experiments. HMPC has a longer planning horizon and results in a smoother trajectory reaching the goal in 8.1 s versus 35.1 s for SMPC. Note that the start and goal positions for SMPC are closer. Otherwise, SMPC cannot find a way around the first encountered obstacle.
    </p>
  </div>
</div>
<br>
<div class="row">
  <div class="col-6">
    <p align="justify">
      The main reason to use HMPC on an embedded computer is its computational efficiency. The figure on the right shows a boxplot with overall execution times for SMPC and HMPC (<i>Control loop</i>) and its most important parts: <i>Module updates</i> and <i>Optimization</i>. The maximum control loop execution time is 50 ms for real-time feasibility of SMPC and TMPC and 500 ms for PMPC. Note that <i>Module updates</i> includes constraints generation and loading new cost function terms, and is low compared to the optimization time. Since the TMPC receives the constraints from the PMPC, its <i>Module updates</i> computation time is even lower. <i>Optimization</i> is the time between calling the solver and obtaining the solution. SMPC contains several control loop cycles exceeding its real-time limit, whereas PMPC and TMPC always finish on time.
    </p>
  </div>
  <div class="col-6">
    <img src="{% include fix_link.html link='/assets/images/papers/hmpc/2024-05-16_exp_hg_2_obs_smpc_hmpc_timing_box.png' %}" width="100%">
  </div>
</div>
<p align="justify">
  In summary, based on all HMPC and SMPC results, we conclude that, compared to SMPC, HMPC:
  <ol>
    <li>is computationally more effecient;</li>
    <li>reaches the goal faster;</li>
    <li>is less sensitive to model mismatch;</li>
    <li>does not require constraints softening to ensure feasibility.</li>
  </ol>
</p>
<hr/>
<h2 align="center"><u>A note on tuning hyperparameters</u></h2>
<p align="justify">
  To run the HMPC scheme, we need to tune several hyperparameters. The most important ones are:
  <ol>
    <li>MPC discretization time $T^\mathrm{s}$;</li>
    <li>MPC horizon length $T$;</li>
    <li>MPC objective weights;</li>
    <li>Terminal set scaling $\alpha$;</li>
    <li>Ratio between sampling times of PMPC and TMPC $\beta$.</li>
  </ol>
  The TMPC discretization time $T^\mathrm{s,t}$ is chosen small enough to ensure accurate control and large enough to solve the MPC problem with a reasonable horizon $T^\mathrm{t}$ in real time on the embedded computer. We choose the PMPC discretization time $T^\mathrm{s,p}$ using the ratio $\beta=\frac{T^\mathrm{s,p}}{T^\mathrm{s,t}}$. As shown in the figure below, $\beta$ gives a trade-off between the PMPC execution time and the goal-reaching time. From this figure we can conclude that $\beta=10$ is a reasonable value to choose. From there, we choose the PMPC horizon length $T^\mathrm{p}$ to be short enough to ensure real-time feasibility and long enough to compute a reasonable trajectory around the obstacles towards the goal. The input weights in both TMPC and PMPC are chosen sufficiently large to ensure stability of the closed-loop system, and the goal and state weights are chosen sufficiently large to ensure that the system reaches the goal and accurately tracks the reference trajectory in the case of PMPC and TMPC, respectively. Finally, the terminal set scaling $\alpha$ is chosen large enough to ensure TMPC feasibility and small enough to optimize a trajectory with limited conservativeness in the PMPC.
</p>
<div style="text-align: center;">
  <img src="{% include fix_link.html link='/assets/images/papers/hmpc/2024-11-20_sim_hg_2_obs_hmpc_beta_timing.png' %}" width="50%">
</div>
<hr/>
<h2 align="center"><u>There is more!</u></h2>
  <p align="justify">
    HMPC has more capabilities. Interested? Check out the <a href="https://youtu.be/0RnrKk6830I">YouTube video</a> and the <a href="https://github.com/dbenders1/hmpc">code</a>!<br>Special care has been taken to construct the repository according to the guidelines presented in recent work<span class="citation" onclick="document.getElementById('cervera2018try').scrollIntoView();"><sup>[2]</sup></span> to enhance reproducibility.
  </p>
<hr/>
<h2 align="center"><u>Research platform</u></h2>
<div class="row">
  <div class="col-6">
    <img src="{% include fix_link.html link='/assets/images/papers/hmpc/Lab_setup.png' %}" width="100%">
  </div>
  <div class="col-6">
    <p align="justify">
      The platform used in the lab experiments of this work is based on the <a href="https://nxp.gitbook.io/hovergames/">NXP HoverGames kit</a>. On top of this kit, we have added an NVIDIA Jetson Xavier NX embedded computer that runs all code.
    </p>
  </div>
</div>
<hr/>
<h2>References</h2>
<ol class="ref-list">
  <li id="liu2017planning">
    S. Liu, M. Watterson, K. Mohta, K. Sun, S. Bhattacharya, C. J. Taylor, and V. Kumar, “Planning dynamically feasible trajectories for quadrotors using safe flight corridors in 3-d complex environments,” <em>IEEE Robotics and Automation Letters</em>, vol. 2, no. 3, pp. 1688–1695, 2017.
  </li>
  <li id="cervera2018try">
    E. Cervera, “Try to start it! the challenge of reusing code in robotics research,” <em>IEEE Robotics and Automation Letters</em>, vol. 4, no. 1, pp. 49–56, 2018.
  </li>
</ol>
