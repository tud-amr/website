---
title: "Coordinated Diffusion: Generating Multi-Agent Behavior Without Multi-Agent Demonstrations"
authors:
  - name: "Lasse Peters"
    url: "https://lasse-peters.net/"
    superscript: "1"
  - name: "Laura Ferranti"
    url: "https://lauraferranti.com/"
    superscript: "2,†"
  - name: "Andrea Bajcsy"
    url: "https://abajcsy.github.io/"
    superscript: "3,†"
  - name: "Javier Alonso-Mora"
    url: "https://autonomousrobots.nl/"
    superscript: "2,†"
affiliations:
  - name: "UC Berkeley"
    superscript: "1"
    url: "https://berkeley.edu"
  - name: "TU Delft"
    superscript: "2"
    url: "https://tudelft.nl"
  - name: "Carnegie Mellon University"
    superscript: "3"
    url: "https://www.cs.cmu.edu/"
  - name: "Equal advising"
    superscript: "†"
release_date: 2026-05-12
links:
  - name: Paper (arXiv)
    icon: bi-file-earmark-pdf
    url: "https://arxiv.org/abs/2605.11485"
  - name: Code (coming soon)
    icon: bi-github
    url: "#"
  - name: Related Publications
    icon: bi-file-text
    url: "#related-publications"
related_project_id: "saraypapers"
sitemap: false
---

<style>
  @font-face {
    font-family: "TeX Gyre Pagella";
    src: url("{{ '/assets/fonts/tex-gyre-pagella/texgyrepagella-regular.woff2' | relative_url }}") format("woff2");
    font-weight: normal; font-style: normal;
  }
  @font-face {
    font-family: "TeX Gyre Pagella";
    src: url("{{ '/assets/fonts/tex-gyre-pagella/texgyrepagella-bold.woff2' | relative_url }}") format("woff2");
    font-weight: bold; font-style: normal;
  }
  @font-face {
    font-family: "TeX Gyre Pagella";
    src: url("{{ '/assets/fonts/tex-gyre-pagella/texgyrepagella-italic.woff2' | relative_url }}") format("woff2");
    font-weight: normal; font-style: italic;
  }
  @font-face {
    font-family: "TeX Gyre Pagella";
    src: url("{{ '/assets/fonts/tex-gyre-pagella/texgyrepagella-bolditalic.woff2' | relative_url }}") format("woff2");
    font-weight: bold; font-style: italic;
  }

  body { font-family: "TeX Gyre Pagella", Palatino, "Palatino Linotype", "Book Antiqua", serif; }

  .codi-plot   { width: 100%; max-width: 353px; display: block; margin: 0 auto; }
  .codi-legend { width: 100%; max-width: 687px; display: block; margin: 0 auto; }
</style>

<hr/>
<video controls playsinline width="100%" poster="{{ '/assets/images/papers/codi/video-poster.jpg' | relative_url }}">
  <source src="{{ '/assets/images/papers/codi/codi2026tro-supplementary-10MB.mp4' | relative_url }}" type="video/mp4">
</video>

<hr/>
<h2 align="center">Abstract</h2>
<p align="justify">
  Imitation learning powered by generative models has proven effective for modeling complex single-agent behaviors.
  However, teaching multi-agent systems, like multiple arms or vehicles, to coordinate through imitation learning is hindered by a fundamental data bottleneck: as the joint state-action space grows exponentially with the number of agents, collecting a sufficient amount of coordinated multi-agent demonstrations becomes extremely costly.
  In this work, we ask: how can we leverage <em>single-agent</em> demonstration data to learn <em>multi-agent</em> policies?
  We present <b>CoDi</b>, a framework that couples independently trained single-agent diffusion policies through a user-defined multi-agent cost function, without requiring any coordinated demonstrations.
  We derive a new diffusion-based sampling scheme wherein the diffusion score function decomposes into independent, single-agent pre-trained base policies plus a cost-driven guidance term that coordinates these base policies into cohesive multi-agent behavior.
  We show that this guidance term can be estimated in a gradient-free manner, making CoDi applicable to black-box, non-differentiable cost functions without additional training.
  Theoretically and empirically, we analyze the conditions under which this composition can faithfully approximate a target multi-agent behavior.
  We find a complementary role for demonstration data versus the cost function: single-agent demonstrations must cover the support of the desired multi-agent behavior, while the cost function must promote desired behavior from this product of single-agent policies.
  Our results in simulation and hardware experiments of a two-arm manipulation task show that CoDi discovers robust coordinated behavior from single-agent data, is more data-efficient than multi-agent baselines, and highlights the importance of joint guidance, base-policy support, and cost design.
</p>

<hr/>
<h2 align="center">Method Overview</h2>
<div class="row">
  <div class="col-12">
    <img src="{% include fix_link.html link='/assets/images/papers/codi/front-figure.jpg' %}" width="100%">
  </div>
</div>
<p align="justify">
  CoDi inverts the conventional <em>centralized training, decentralized execution</em> paradigm: instead, it enables <em>decentralized</em> (single-agent) pre-training at the cost of requiring <em>centralized</em> execution.
  The method proceeds in three steps:
  <ol>
    <li>Train independent single-agent diffusion policies from single-agent demonstrations of basic skills (e.g., picking and placing objects).</li>
    <li>Specify a user-defined multi-agent cost function that encodes the desired coordination behavior (e.g., move the object to a goal, avoid collisions).</li>
    <li>At deployment, solve a KL-regularized cooperative game that combines the single-agent base policies with a cost-driven guidance term into a cohesive multi-agent policy.</li>
  </ol>
  The resulting multi-agent policy takes the composite form
  $$\pi(\mathbf{a} \mid \mathbf{s}) \propto \exp\!\left(-J(\mathbf{s}, \mathbf{a}) / \lambda\right) \cdot \prod_i p^{(i)}(a^{(i)} \mid s^{(i)}),$$
  where each $p^{(i)}$ is a single-agent diffusion policy and $J$ is the shared cost function.
  Crucially, the guidance term is estimated in a gradient-free, sampling-based manner, making the approach applicable to black-box simulators and non-differentiable costs.
</p>
<p align="justify">
  In the paper, we formally analyze under which conditions this structure can recover a desired target behavior $\pi^*$.
  The key result is that exact recovery is possible when the product of single-agent policies is an <em>over-approximation</em> of $\pi^*$ — i.e., wherever $\pi^*$ assigns positive probability to a joint action, the product must as well (a support-coverage condition).
  Under this condition, the cost $J$ can compensate for the KL gap between the product of single-agent policies and $\pi^*$: the more informative the single-agent demonstrations are for the targeted multi-agent behavior, the less design effort needs to go into $J$.
</p>

<hr/>
<h2 align="center">Results</h2>
<div class="card border-secondary mb-4">
  <div class="card-header fw-bold">Key Takeaways</div>
  <div class="card-body">
    <ul class="mb-0">
      <li><b>(C1)</b> CoDi discovers object-handover strategies from single-agent demonstrations alone — no multi-agent data required.</li>
      <li><b>(C2)</b> CoDi is robust enough for real-hardware deployment and generalizes to unseen objects.</li>
      <li><b>(C3)</b> CoDi outperforms methods trained on multi-agent demonstrations at the same data budget, using cheaper single-agent data that also transfers better when data is scarce.</li>
      <li><b>(C4)</b> Joint guidance is critical: independently guiding single-agent policies leads to arm collisions and task failures.</li>
      <li><b>(C5)</b> The sampling-based guidance estimator is necessary — classifier guidance fails when applied to independently pre-trained single-agent policies.</li>
      <li><b>(C6)</b> The cost function must supply the coordination signal absent from single-agent demonstrations; a simplified cost degrades CoDi but not a jointly trained baseline.</li>
    </ul>
  </div>
</div>

<h2 align="center">Hardware Experiments</h2>
<div class="row g-1">
  <div class="col"><img src="{% include fix_link.html link='/assets/images/papers/codi/multi-agent-banner-frames/001.jpg' %}" width="100%"></div>
  <div class="col"><img src="{% include fix_link.html link='/assets/images/papers/codi/multi-agent-banner-frames/002.jpg' %}" width="100%"></div>
  <div class="col"><img src="{% include fix_link.html link='/assets/images/papers/codi/multi-agent-banner-frames/003.jpg' %}" width="100%"></div>
  <div class="col"><img src="{% include fix_link.html link='/assets/images/papers/codi/multi-agent-banner-frames/004.jpg' %}" width="100%"></div>
  <div class="col"><img src="{% include fix_link.html link='/assets/images/papers/codi/multi-agent-banner-frames/005.jpg' %}" width="100%"></div>
</div>
<p align="justify">
  We deploy CoDi on two 7-DoF Franka Research 3 arms placed at opposite ends of a table (1.8 m wide × 1.2 m deep) — wide enough that no single arm can reach across.
  CoDi guides the left arm to pick up the cube and place it at an intermediate location reachable by the right arm, which then completes the task by placing the cube at the goal (green star).
  <b>(C1) Object handovers are not present in the single-agent training data</b> — CoDi discovers this collaboration strategy by composing the individual manipulation skills through the multi-agent cost function.
  The supplementary video also includes examples where the cube is replaced with other objects, demonstrating <b>(C2)</b> robustness of the learned behavior beyond the training conditions.
</p>

<hr/>
<h2 align="center">Simulation Results</h2>

<h4>CoDi is more data-efficient than methods requiring multi-agent demonstrations (C3)</h4>
<p align="justify">
  We compare CoDi (trained on single-agent data only) against four baselines that use multi-agent demonstration data: classifier-guided diffusion (CG-Joint), diffusion policy mirror descent (DPMD-Joint), stochastic diffusion actor-critic (SDAC-Joint), and expert policy optimization (EXPO-Joint).
  Despite the less informative training data, CoDi achieves better task efficiency and manipulation accuracy than all baselines.
  As an additional ablation, applying our guidance scheme to a <em>joint</em> base policy (CoDi-Joint) also improves performance but falls short of CoDi with single-agent pre-training — confirming that the single-agent state-action space yields better manipulation skills per demonstration.
</p>
<img src="{% include fix_link.html link='/assets/images/papers/codi/plots/legend_joint.jpg' %}" class="codi-legend">
<div class="row">
  <div class="col-md-6">
    <img src="{% include fix_link.html link='/assets/images/papers/codi/plots/completion_times_ecdf_joint.jpg' %}" class="codi-plot">
    <p align="center">Task efficiency</p>
  </div>
  <div class="col-md-6">
    <img src="{% include fix_link.html link='/assets/images/papers/codi/plots/min_box_distances_ecdf_joint.jpg' %}" class="codi-plot">
    <p align="center">Manipulation accuracy</p>
  </div>
</div>
<p align="justify">
  We further study the sensitivity to demonstration data density.
  Training CoDi on only 20% of the single-agent data still achieves a task success rate close to CG-Joint trained on the <em>full</em> multi-agent dataset (88% vs. 92%), while substantially outperforming CG-Joint trained on the same reduced multi-agent dataset (54% success rate).
  This highlights that single-agent demonstrations — which are far cheaper to collect — transfer more efficiently to the multi-agent setting.
</p>
<img src="{% include fix_link.html link='/assets/images/papers/codi/plots/legend_data_density.jpg' %}" class="codi-legend">
<div class="row">
  <div class="col-md-6">
    <img src="{% include fix_link.html link='/assets/images/papers/codi/plots/completion_times_ecdf_data_density.jpg' %}" class="codi-plot">
    <p align="center">Task efficiency</p>
  </div>
  <div class="col-md-6">
    <img src="{% include fix_link.html link='/assets/images/papers/codi/plots/min_box_distances_ecdf_data_density.jpg' %}" class="codi-plot">
    <p align="center">Manipulation accuracy</p>
  </div>
</div>

<h4>Joint guidance is critical for safe coordination (C4)</h4>
<p align="justify">
  A key design choice is that CoDi generates <em>joint</em> actions for all robots simultaneously, rather than guiding each robot independently.
  Without joint guidance (CoDi-Indep.), robots can fail to coordinate: both arms attempt to reach the cube at the same time, leading to arm collisions and task failures.
  Joint guidance eliminates this failure mode by explicitly accounting for inter-agent interactions through the collision-avoidance and engagement cost components.
</p>
<img src="{% include fix_link.html link='/assets/images/papers/codi/plots/legend_product.jpg' %}" class="codi-legend">
<div class="row">
  <div class="col-md-6">
    <img src="{% include fix_link.html link='/assets/images/papers/codi/plots/completion_times_ecdf_product.jpg' %}" class="codi-plot">
    <p align="center">Task efficiency</p>
  </div>
  <div class="col-md-6">
    <img src="{% include fix_link.html link='/assets/images/papers/codi/plots/min_box_distances_ecdf_product.jpg' %}" class="codi-plot">
    <p align="center">Manipulation accuracy</p>
  </div>
  <div class="col-md-6">
    <img src="{% include fix_link.html link='/assets/images/papers/codi/plots/min_inter_arm_distances_ecdf_product.jpg' %}" class="codi-plot">
    <p align="center">Safety (inter-arm distance)</p>
  </div>
  <div class="col-md-6 d-flex align-items-center">
    <img src="{% include fix_link.html link='/assets/images/papers/codi/codi-indep-collision.png' %}" width="100%">
  </div>
</div>
<p align="center">Independent guidance failure: both arms reach for the cube simultaneously, causing a collision.</p>

<h4>The guidance estimator matters when composing single-agent policies (C5)</h4>
<p align="justify">
  We compare our sampling-based guidance estimator against applying vanilla classifier guidance to the product-of-marginals base policy (CG-Product).
  While classifier guidance works reasonably well when the base policy already encodes coordination (as in the joint baseline setting), it fails when applied to independently pre-trained single-agent policies.
  The product-of-marginals policy exhibits a larger tilt relative to the coordinated target distribution, making the learned cost model a poor guide.
  Our sampling-based estimator bridges this gap without requiring an additional trained cost model.
</p>
<img src="{% include fix_link.html link='/assets/images/papers/codi/plots/legend_guidance_variants.jpg' %}" class="codi-legend">
<div class="row">
  <div class="col-md-6">
    <img src="{% include fix_link.html link='/assets/images/papers/codi/plots/completion_times_ecdf_guidance_variants.jpg' %}" class="codi-plot">
    <p align="center">Task efficiency</p>
  </div>
  <div class="col-md-6">
    <img src="{% include fix_link.html link='/assets/images/papers/codi/plots/min_box_distances_ecdf_guidance_variants.jpg' %}" class="codi-plot">
    <p align="center">Manipulation accuracy</p>
  </div>
</div>

<h4>The cost function must compensate for the coordination gap in single-agent data (C6)</h4>
<p align="justify">
  We isolate the role of the guidance cost by evaluating a simplified variant that retains only the goal term, removing the collision-avoidance and engagement components.
  CoDi with single-agent base policies degrades substantially under this simplified cost, whereas a joint base policy trained on multi-agent demonstrations remains largely unaffected.
  This confirms the complementary roles of demonstrations and the cost function: when coordination is not present in the training data, the cost must explicitly supply it.
</p>
<img src="{% include fix_link.html link='/assets/images/papers/codi/plots/legend_simple_cost.jpg' %}" class="codi-legend">
<div class="row">
  <div class="col-md-6">
    <img src="{% include fix_link.html link='/assets/images/papers/codi/plots/completion_times_ecdf_simple_cost.jpg' %}" class="codi-plot">
    <p align="center">Task efficiency</p>
  </div>
  <div class="col-md-6">
    <img src="{% include fix_link.html link='/assets/images/papers/codi/plots/min_box_distances_ecdf_simple_cost.jpg' %}" class="codi-plot">
    <p align="center">Manipulation accuracy</p>
  </div>
</div>

<hr/>
<h2 align="center">Limitations &amp; Future Work</h2>
<ul>
  <li><b>Using available multi-agent data:</b> This work studies the extreme case of <em>no</em> multi-agent demonstrations. In practice, some such data may exist. How to combine it with single-agent demonstrations — e.g., for fine-tuning the base policy or learning the guidance term directly — is a natural next step.</li>
  <li><b>Centralized execution:</b> CoDi coordinates agents centrally at test time. Distilling the resulting joint policy into a decentralized one is an important direction for deployment in settings where communication is limited.</li>
  <li><b>Cooperative assumption:</b> CoDi assumes all agents optimize a shared cost. Extending the framework to non-cooperative settings with distinct per-agent objectives is an open avenue for future work.</li>
</ul>
