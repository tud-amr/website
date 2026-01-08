---
title: "CoDi: Synthesizing Multi-Agent Behavior from Single-Agent Demonstrations via Coordinated Diffusion"
authors:
  - name: "Lasse Peters"
    url: "https://lasse-peters.net/"
    superscript: "1"
  - name: "Andrea Bajcsy"
    url: "https://www.cs.cmu.edu/~abajcsy/"
    superscript: "2"
  - name: "Javier Alonso-Mora"
    url: "https://www.autonomousrobots.nl/"
    superscript: "1"
affiliations:
  - name: "TU Delft"
    superscript: "1"
    url: "https://tudelft.nl"
  - name: "Carnegie Mellon University"
    superscript: "2"
    url: "https://www.cs.cmu.edu/"
release_date: 2025-01-01 # publication or relevant date, approximated if not sure. Just for display purposes and ordering.
links: # If you have other website for the project, github repos, datasets, etc. put it here. You can also add an icon from https://icons.getbootstrap.com/
  - name: Paper (coming soon)
    icon: bi-file-earmark-pdf
    # url: "https://arxiv.org/abs/..."
  # - name: Code
  #   icon: bi-github
  #   url: "https://github.com/..."
  # - name: Video
  #   icon: bi-youtube
  #   url: "https://www.youtube.com/watch?v=..."
  - name: Related Publications
    icon: bi-file-text
    url: "#related-publications"
related_project_id: "saraypapers"
hidden: true # Only accessible via direct link, not listed or indexed
sitemap: false # Exclude from sitemap
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

<hr/>
<h2 align="center"><u>Method Overview</u></h2>
<div class="row">
  <div class="col-12">
    <img src="{% include fix_link.html link='/assets/images/papers/codi/method-overview.png' %}" width="100%">
  </div>
</div>
<p align="justify">
  We present <b>CoDi (Coordinated Diffusion)</b>, a method for synthesizing coordinated multi-agent behavior from single-agent demonstrations.
  Our approach composes single-agent diffusion policies with a user-defined multi-agent cost function to generate coordinated behavior without requiring any multi-agent demonstration data.
</p>

<hr/>
<h2 align="center"><u>Abstract</u></h2>
<p align="justify">
  Imitation learning enables individual robots to learn complex behaviors such as object manipulation from expert demonstrations.
  Generative models such as diffusion policies have recently further enhanced this capability.
  However, many real-world tasks require multi-agent interaction—e.g., a robotic manipulator relying on another arm to grab an out-of-reach object, clearing a table after dinner, or assembling a piece of furniture.
</p>
<p align="justify">
  A key challenge in solving complex multi-agent tasks is the scarcity of data in these settings, which can be attributed to two main issues:
  (i) the product space of states and actions grows exponentially with the number of players and
  (ii) the cost of acquiring data for multi-agent systems is inevitably higher than for single-agent systems.
</p>
<p align="justify">
  To tackle these challenges, this work focuses on the following question:
  <em>How can we generate multi-agent behavior while leveraging single-agent demonstrations?</em>
  We investigate this question based on the observation that the gap between single-agent and multi-agent behavior often does not arise in the low-level actuation of robots, but rather at a higher level of decision-making.
  As a result, single-agent data can serve as a strong prior for learning multi-agent policies.
</p>
<p align="justify">
  The main contribution of this work is <b>CoDi</b>, a method for synthesizing a single cohesive multi-agent policy by <em>guiding</em> multiple single-agent diffusion policies towards <em>coordinated</em> behavior.
  We achieve this via a multi-stage training procedure:
  <ol>
    <li>The user provides single-agent demonstrations of basic single-agent skills (e.g., picking and placing objects).</li>
    <li>We use this data to train single-agent diffusion policies that capture the low-level skills of each agent.</li>
    <li>The user provides a multi-agent cost function that penalizes deviations from desired multi-agent behavior.</li>
    <li>We construct a centralized guidance model from this cost function that bridges the gap between the marginal (single-agent) diffusion policies and the joint (multi-agent) diffusion policy.</li>
  </ol>
</p>

<hr/>
<h2 align="center"><u>Key Idea: Decentralized Pre-training, Centralized Execution</u></h2>
<p align="justify">
  Our approach effectively inverts the conventional <em>centralized training, decentralized execution</em> paradigm: we enable <em>decentralized</em> (single-agent) pre-training at the expense of requiring <em>centralized</em> execution.
  We contend that in many settings, this trade-off is preferable; enabling centralized execution via multi-agent communication is often less demanding than collecting multi-agent demonstration data.
</p>
<p align="justify">
  Mathematically, our proposed multi-agent policy takes the following composite form:
</p>
<p align="center">
  <em>π(a | s) ∝ exp(-J(s, a) / λ) · ∏<sub>i</sub> p<sup>(i)</sup>(a<sup>(i)</sup> | s<sup>(i)</sup>)</em>
</p>
<p align="justify">
  where <em>p<sup>(i)</sup></em> is the single-agent diffusion policy for agent <em>i</em> (learned from single-agent data), and <em>J</em> is the user-defined multi-agent cost function that penalizes deviations from desired multi-agent behavior.
</p>

<hr/>
<h2 align="center"><u>Task: Out-of-Reach Manipulation</u></h2>
<div class="row">
  <div class="col-12">
    <img src="{% include fix_link.html link='/assets/images/papers/codi/rollout.png' %}" width="100%">
  </div>
</div>
<p align="justify">
  <b>Qualitative example of the closed-loop behavior of CoDi.</b>
  Two 7-DoF Franka arms are placed at opposite ends of a wide table.
  The dimensions of the table (width 1.8m, depth 1.2m) are such that no single robot can reach across the entire table.
  The task requires both robots to collaboratively move the object (a red cube) to the goal location (marked by a green star).
</p>
<p align="justify">
  In this example, the goal is not reachable for the right robot.
  CoDi causes the right robot to pick up the object and place it at an intermediate location reachable by the left robot, which then completes the task.
  <b>Notably, object handovers are not part of single-agent demonstrations—CoDi discovers new collaboration strategies not present in the original training data.</b>
</p>

<hr/>
<h2 align="center"><u>Results</u></h2>
<p align="justify">
  We compare CoDi against <b>Multi-Agent Classifier-Guidance (MACG)</b>, which applies vanilla classifier-guidance to a multi-agent diffusion policy trained directly on multi-agent demonstrations.
  Both methods are trained on the same amount of data.
</p>

<div class="row">
  <div class="col-md-6">
    <img src="{% include fix_link.html link='/assets/images/papers/codi/completion_times_ecdf.png' %}" width="100%">
    <p align="center"><b>Task Completion Time</b>: CoDi completes tasks faster.</p>
  </div>
  <div class="col-md-6">
    <img src="{% include fix_link.html link='/assets/images/papers/codi/min_box_distances_ecdf.png' %}" width="100%">
    <p align="center"><b>Manipulation Accuracy</b>: CoDi achieves better goal accuracy.</p>
  </div>
</div>

<p align="justify">
  <b>Key findings:</b>
  <ul>
    <li><b>CoDi learns multi-agent policies while pre-training only on single-agent data.</b></li>
    <li><b>CoDi discovers new collaboration strategies</b> (such as object handovers) not present in the original single-agent demonstrations.</li>
    <li><b>CoDi generates more efficient and accurate manipulation policies</b> than baselines that directly rely on multi-agent demonstrations, given the same amount of data.</li>
  </ul>
</p>
<p align="justify">
  These results suggest that—by learning manipulation skills in the smaller single-agent state-action space—CoDi makes use of the training data more efficiently than methods that require multi-agent demonstrations.
</p>

<hr/>
<h2 align="center"><u>Cost Function Design</u></h2>
<p align="justify">
  The cost function used for guidance takes the form of a weighted sum of cost components:
</p>
<p align="center">
  <em>J(s, a) = J<sub>goal</sub>(s, a) + J<sub>collision</sub>(s, a) + J<sub>engage</sub>(s, a)</em>
</p>
<p align="justify">
  where:
  <ul>
    <li><b>J<sub>goal</sub></b> measures the distance of the object from the goal resulting from applying action-sequence <em>a</em> from state <em>s</em>.</li>
    <li><b>J<sub>collision</sub></b> is a binary indicator, equal to one if end-effectors are closer than a given safety distance.</li>
    <li><b>J<sub>engage</sub></b> measures the distance of the closer robot to the object, encouraging engagement with the task.</li>
  </ul>
</p>
<p align="justify">
  The demonstration data only encodes knowledge of the base <em>skills</em> (picking and placing objects); not of the exact task to be performed (where the object should be placed).
  Instead, the task-specific information is encoded in the cost function.
  This enables using the same base policy for multiple different tasks.
</p>

<hr/>
<h2 align="center"><u>Limitations & Future Work</u></h2>
<p align="justify">
  Despite these promising results, several limitations suggest directions for future work:
  <ul>
    <li><b>Simulator dependency:</b> The current approach requires evaluating the joint effect of all agents' actions on the future environment state. In our manipulation example, this requires a simulator to assess the cost function. Although our offline score estimator mitigates computational cost, such a simulator may not always be available.</li>
    <li><b>Cost function design:</b> While our proposed online score estimator facilitates rapid evaluation of a given cost design, specifying an appropriate cost function remains challenging.</li>
    <li><b>Cooperative assumption:</b> We assume fully cooperative behavior, requiring all players to optimize the same cost function. Future work should explore non-cooperative settings with distinct costs.</li>
  </ul>
</p>
<p align="justify">
  These limitations motivate future research into learning the guidance term directly from a <em>small</em> number of multi-agent demonstrations, thereby eliminating the need to define the multi-agent cost function explicitly.
</p>
