<script>
    const appName = process.env.APP_NAME
    var words = ["E-commerce", "SEO Ready Websites", "Hosting Services", "Custom Websites"],
            randomWords = 'Custom Websites',
            currentWord = 0;

    const getRandom = function () {
        return parseInt(Math.random() * words.length)
    }

    setInterval(function () {
        var newWord = getRandom()

        while (newWord === currentWord) newWord = getRandom()
        currentWord = newWord
        randomWords = words[currentWord]

    }, 5000)
</script>

<svelte:head>
    <title>{appName} - Web Development Services</title>
</svelte:head>

<section class="hero is-light">
    <div class="hero-body">
        <div class="container has-text-centered">
            <h1 class="title is-size-1">
                Get your business online with
                {appName} Services
            </h1>
            <br>
            <h2 class="subtitle">
                <strong>Services Offered<br> {randomWords}
                </strong>
            </h2>
            <div>
                <img src="/img/website-hosting.gif" alt="Web Hosting Services">
            </div>
            <br>
            <a class="button is-large is-info" href="quote">GET A QUOTE</a>
            <br>
            <br>
        </div>
    </div>
</section>

<section class="section spaced">
    <div class="container">
        <div class="columns">
            <div class="column is-half box-out">
                <div class="box-in">
                    <h1 class="title is-size-1">Do you need to improve your website?</h1>
                    <h2 class="subtitle">Have an inspiration website?</h2>
                    <p>{appName} can customize the design to tailored your industry.</p>
                </div>
            </div>
            <div class="column in-half">
                <figure class="image is-fullwidth">
                    <img src="/img/modern-website.gif" alt="E-commerce website">
                </figure>
            </div>
        </div>
    </div>
</section>

<section class="section spaced">
    <div class="container">
        <div class="columns">
            <div class="column is-half">
                <figure class="image is-fullwidth">
                    <img src="/img/hosting-services.gif" alt="E-commerce website">
                </figure>
            </div>
            <div class="column is-half box-out">
                <div class="box-in">
                    <h1 class="title is-size-1">Whether you need a website, online shop or anything else.</h1>
                    <p>{appName} can help you get started from a simple blog to a more complex website.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section">
    <div class="container has-text-centered">
    <a href="/quote" class="button is-large is-info">GET A QUOTE</a>
    </div>
</section>

<div class="section spaced">
    <div class="container">
        <div class="columns">
            <div class="column is-half">
                <div class="box">
                    <article class="media">
                        <div class="media-left">
                            <figure class="image icon is-64x64">
                                <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <path
                                                d="M21.75,0 C22.9926407,0 24,1.00735931 24,2.25 L24,9.93797721 C24.0004226,16.891852
                                18.9816355,22.830527 12.125,23.98951 C12.0422535,24.0034967 11.9577465,24.0034967
                                11.875,23.98951 C5.01836448,22.830527 -0.00042263272,16.891852 0,9.938 L0,2.25
                                C0,1.00735931 1.00735931,0 2.25,0 L21.75,0 Z M22.499,6 L1.499,6 L1.5,9.93804558
                                C1.49962443,16.1176187 5.92921489,21.4011541 12,22.4887295 C18.0707851,21.4011541
                                22.5003756,16.1176187 22.5,9.93804558 L22.499,6 Z M16.7196699,9.21866991
                                C17.0125631,8.9257767 17.4874369,8.9257767 17.7803301,9.21866991 C18.0732233,9.51156313
                                18.0732233,9.98643687 17.7803301,10.2793301 L17.7803301,10.2793301
                                L12.3107076,15.7489523 C12.0295295,16.0305312 11.6479294,16.1887543 11.25,16.1887543
                                C10.8520706,16.1887543 10.4704705,16.0305312 10.1898241,15.7494843
                                L10.1898241,15.7494843 L8.46982415,14.0304843 C8.17684577,13.7376762
                                8.17670769,13.2628025 8.46951573,12.9698241 C8.76232376,12.6768458 9.23719748,12.6767077
                                9.53017585,12.9695157 L9.53017585,12.9695157 L11.2496699,14.6886699 Z M21.75,1.5
                                L2.25,1.5 C1.83578644,1.5 1.5,1.83578644 1.5,2.25 L1.499,4.5 L22.499,4.5 L22.5,2.25
                                C22.5,1.83578644 22.1642136,1.5 21.75,1.5 Z"
                                                fill="currentColor" />
                                    </g>
                                </svg>
                            </figure>
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <h1>Standard security</h1>
                                <p>
                                    Data is protected by HTTPS encryption.
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <div class="column is-half">
                <div class="box">
                    <article class="media">
                        <div class="media-left">
                            <figure class="image is-64x64 icon">
                                <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <path
                                                d="M21.75,0 C22.9926407,0 24,1.00735931 24,2.25 L24,9.93797721 C24.0004226,16.891852
                                18.9816355,22.830527 12.125,23.98951 C12.0422535,24.0034967 11.9577465,24.0034967
                                11.875,23.98951 C5.01836448,22.830527 -0.00042263272,16.891852 0,9.938 L0,2.25
                                C0,1.00735931 1.00735931,0 2.25,0 L21.75,0 Z M22.499,6 L1.499,6 L1.5,9.93804558
                                C1.49962443,16.1176187 5.92921489,21.4011541 12,22.4887295 C18.0707851,21.4011541
                                22.5003756,16.1176187 22.5,9.93804558 L22.499,6 Z M16.7196699,9.21866991
                                C17.0125631,8.9257767 17.4874369,8.9257767 17.7803301,9.21866991 C18.0732233,9.51156313
                                18.0732233,9.98643687 17.7803301,10.2793301 L17.7803301,10.2793301
                                L12.3107076,15.7489523 C12.0295295,16.0305312 11.6479294,16.1887543 11.25,16.1887543
                                C10.8520706,16.1887543 10.4704705,16.0305312 10.1898241,15.7494843
                                L10.1898241,15.7494843 L8.46982415,14.0304843 C8.17684577,13.7376762
                                8.17670769,13.2628025 8.46951573,12.9698241 C8.76232376,12.6768458 9.23719748,12.6767077
                                9.53017585,12.9695157 L9.53017585,12.9695157 L11.2496699,14.6886699 Z M21.75,1.5
                                L2.25,1.5 C1.83578644,1.5 1.5,1.83578644 1.5,2.25 L1.499,4.5 L22.499,4.5 L22.5,2.25
                                C22.5,1.83578644 22.1642136,1.5 21.75,1.5 Z"
                                                fill="currentColor" />
                                    </g>
                                </svg>
                            </figure>
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <h1 class="title">
                                    Excellent support
                                </h1>
                                <p>
                                    We resolve issues usually within the same day.
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-half">
                <div class="box">
                    <article class="media">
                        <div class="media-left">
                            <figure class="image is-64x64 icon">
                                <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <path
                                                d="M20.8392398,12.0524301 C22.0372383,12.2467402 23.0688202,13.005043
                                23.611912,14.090773 C24.3382836,15.5445084 24.0533397,17.2999034 22.9153771,18.438048
                                L17.8013771,23.772048 C17.5061419,24.079984 17.0138581,24.079984 16.7186229,23.772048
                                L11.6156611,18.4493212 C10.4662948,17.2999167 10.1817416,15.5438315 10.9091645,14.09062
                                C11.4518415,13.0051437 12.4832806,12.2467515 13.6811915,12.0524154
                                C14.8791025,11.8580794 16.097399,12.2514991 16.9553301,13.1096699 L17.26,13.4143398
                                L17.5646738,13.1096661 C18.4228632,12.2514891 19.6412413,11.85812 20.8392398,12.0524301
                                Z M18.6253301,14.1703301 L17.7903301,15.0053301 C17.4974369,15.2982233
                                17.0225631,15.2982233 16.7296699,15.0053301 L15.8945958,14.170256 C15.3775199,13.6530356
                                14.6433147,13.4159416 13.9213949,13.533058 C13.199475,13.6501744 12.5778793,14.1072188
                                12.2506695,14.7617118 C11.8121888,15.6376882 11.9836745,16.6959912 12.6873771,17.399952
                                L17.260012,22.1692978 L21.8435737,17.3887662 C22.5362069,16.6958815 22.707988,15.6376251
                                22.2702357,14.7615223 C21.9429738,14.1072719 21.3211834,13.6502018 20.5990848,13.5330805
                                C19.8769861,13.4159593 19.1426036,13.6530641 18.6253301,14.1703301 Z M2.25,0.003
                                L20.25,0.003 C21.440864,0.003 22.4156449,0.928161591 22.4948092,2.09895119 L22.5,2.253
                                L22.5,9.753 C22.5,10.1672136 22.1642136,10.503 21.75,10.503 C21.3703042,10.503
                                21.056509,10.2208461 21.0068466,9.85477056 L21,9.753 L21,6.003 L1.5,6.003 L1.5,18.753
                                C1.5,19.1326958 1.78215388,19.446491 2.14822944,19.4961534 L2.25,19.503 L9.75,19.503
                                C10.1642136,19.503 10.5,19.8387864 10.5,20.253 C10.5,20.6326958 10.2178461,20.946491
                                9.85177056,20.9961534 L9.75,21.003 L2.25,21.003 C1.05913601,21.003
                                0.084355084,20.0778384 0.00519081254,18.9070488 L0,18.753 L0,2.253 C0,1.06213601
                                0.925161591,0.087355084 2.09595119,0.00819081254 L2.25,0.003 L20.25,0.003 Z M20.25,1.503
                                L2.25,1.503 C1.87030423,1.503 1.55650904,1.78515388 1.50684662,2.15122944 L1.5,2.253
                                L1.5,4.503 L21,4.503 L21,2.253 C21,1.87330423 20.7178461,1.55950904
                                20.3517706,1.50984662 L20.25,1.503 Z"
                                                fill="currentColor" />
                                    </g>
                                </svg>
                            </figure>
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <h1 class="title">Customer satisfaction guaranteed</h1>
                                <p>
                                    Our goal is customer retention and loyalty.
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <div class="column is-half">
                <div class="box">
                    <article class="media">
                        <div class="media-left">
                            <figure class="image is-64x64 icon">
                                <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <path
                                                d="M21.75,0 C22.9926407,0 24,1.00735931 24,2.25 L24,9.93797721 C24.0004226,16.891852
                                18.9816355,22.830527 12.125,23.98951 C12.0422535,24.0034967 11.9577465,24.0034967
                                11.875,23.98951 C5.01836448,22.830527 -0.00042263272,16.891852 0,9.938 L0,2.25
                                C0,1.00735931 1.00735931,0 2.25,0 L21.75,0 Z M22.499,6 L1.499,6 L1.5,9.93804558
                                C1.49962443,16.1176187 5.92921489,21.4011541 12,22.4887295 C18.0707851,21.4011541
                                22.5003756,16.1176187 22.5,9.93804558 L22.499,6 Z M16.7196699,9.21866991
                                C17.0125631,8.9257767 17.4874369,8.9257767 17.7803301,9.21866991 C18.0732233,9.51156313
                                18.0732233,9.98643687 17.7803301,10.2793301 L17.7803301,10.2793301
                                L12.3107076,15.7489523 C12.0295295,16.0305312 11.6479294,16.1887543 11.25,16.1887543
                                C10.8520706,16.1887543 10.4704705,16.0305312 10.1898241,15.7494843
                                L10.1898241,15.7494843 L8.46982415,14.0304843 C8.17684577,13.7376762
                                8.17670769,13.2628025 8.46951573,12.9698241 C8.76232376,12.6768458 9.23719748,12.6767077
                                9.53017585,12.9695157 L9.53017585,12.9695157 L11.2496699,14.6886699 Z M21.75,1.5
                                L2.25,1.5 C1.83578644,1.5 1.5,1.83578644 1.5,2.25 L1.499,4.5 L22.499,4.5 L22.5,2.25
                                C22.5,1.83578644 22.1642136,1.5 21.75,1.5 Z"
                                                fill="currentColor" />
                                    </g>
                                </svg>
                            </figure>
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <h1 class="title">Powerfull Hosting Serice</h1>
                                <p>
                                    Maximize your website general performance with our SSD.
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .spacer{
        display: block;
        width: 100%;
        height: 3em;
    }
    .subtitle{
        font-size: 1.9rem;
    }
    .icon svg {
        width: 50px;
        height: 50px;
        margin-bottom: 16px;
        color: #2793DA;
    }
    .spaced {
        padding: 6em 1.5em;
    }
    @media all and (min-width: 767px){
        .box{
            height: 212px;
        }
    }

</style>
