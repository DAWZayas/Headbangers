<template>
    <div class="footer">
        <div class="logo"><p>Headbangers <span class="year">2018</span></p></div>
        <div class="footer-links"><a href="">About</a></div>
        <div class="footer-links"><a href="">Contact</a></div>
        <div class="footer-links"><a href="">Help</a></div>  
        <div class="footer-links"><a href="">Legal</a></div>    
        <div class="github-logo"><a href="https://github.com/DAWZayas/Headbangers"><img src="~/static/img/social/github-logo.svg" alt="github"><p>GitHub</p></a></div>
    </div>

  
</template>
<script>
export default {
    name: "footer-component" 
}
</script>
<style lang="scss">
    @import "assets/styles/colors.scss";
    @import "assets/styles/breakpoints.scss";
    .footer{
       // margin-top: 6.5em;
        padding: 1em;
        background-color: $mainColorDark;
        display: grid;
        grid-template-columns: 10fr 2fr;
        grid-template-rows: auto;
        grid-template-areas:
        "links ."
        "links ."
        "links github"
        "links github"
        "logo logo"
        ;
        a:hover{
        filter: opacity(75%);
            }
    }
    .footer-links{
        grid-column: 1;
        grid-row: auto;
        margin: .25em;
        a{
            color: $grayLight; 
        }
    }
    .logo{
        grid-area: logo;
        margin-top: .5em;
        padding-top: .25em;
        border-top: solid $gray 1px;
        p{
            margin: 0;
            font-size: 1.25em;
            color: $grayLight;
        }
        .year{
            font-size: .9em;
        }
    }
    .github-logo{
        grid-area: github;   
        text-align: center;
        a{  
            
            p{
                margin: 0;
                color: $grayLight;
                font-size: .75em;
               
            }
            img{
                margin: 0;
                width: 2em;
                
            }        
        }
    }
    
@media(min-width: $break-xs-sm) {
    .footer{
        align-items: center;
        text-align: center;
        grid-template-columns: 20fr 5fr 5fr 5fr 6fr 5fr;
        grid-template-rows: auto;
        grid-template-areas:
        "logo links links links links github"
        ;
    }
    .footer-links{
        margin: 0;
        border-right: solid 1px $gray;
        grid-column-start: auto;
        grid-row: auto;
        padding: 0em .25em;
        
    }
    .logo{
        grid-area: logo;
        text-align: left;
        margin: 0;
        padding: 0;
        border-top: none;
    }
}

</style>
